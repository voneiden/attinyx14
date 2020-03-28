import json
import re
import sys
import time
import unittest
from enum import Enum, auto
from typing import TextIO


class Interrupt(Enum):
    related_links = auto()


class State(Enum):
    init = auto()


RE_STARTSWITH_DIGIT = r'^\d'
RE_REGISTRY_NAME = r'.+ Summary - (?P<registry_name>.+)'
RE_OFFSET_NAME = r'Name:\u2000 (?P<offset_name>.+)'
RE_PROPERTY = r'Property:\u2000'
RE_BIT_MATCH = r'Bit \d+ \d+ \d+'
RE_FIELD_TITLE = r'Bits?(?P<bits>.+?) \u2013 (?P<name>.+?)\u2000(?P<title>.+)'


class ContinueException(Exception):
    pass


class FieldTableMode(Enum):
    INACTIVE = auto()
    DOUBLE = auto()
    TRIPLE = auto()


class Parser(object):
    def __init__(self):
        self.state = State.init
        self.interrupt = None

        self.regs = []
        self.offsets = []
        self.fields = []

        self.line = None
        self.last_line = None
        self.registry = None
        self.offset_description_buffer = False
        self.field_description_buffer = []
        self.field_table_row_buffer = []
        self.field_table_mode = FieldTableMode.INACTIVE

    def parse_registry(self):
        match = re.match(RE_REGISTRY_NAME, self.line)
        if match:
            registry_name = self.fix_registry_names(match.groupdict()['registry_name'])
            print(f"\nRegistry: {registry_name}")
            self.registry = [reg for reg in self.regs if reg['name'] == registry_name][0]
            raise ContinueException

    @staticmethod
    def fix_registry_names(registry_name):
        if registry_name == 'TCA in Split Mode (CTRLD.SPLITM=1)':
            return 'TCA-SPLIT'
        elif registry_name == 'TCA in Normal Mode (CTRLD.SPLITM=0)':
            return 'TCA'
        return registry_name

    def parse_offset(self):
        match = re.match(RE_OFFSET_NAME, self.line)
        if match:
            offset_name = match.groupdict()['offset_name']
            print(f" - offset: {offset_name}")

            # Strip lowercase 'n' from the end of offset name.
            if offset_name[-1] == 'n':
                offset_name = offset_name[:-1]

            self.offsets = [offset for offset in self.registry['offsets'] if (
                    offset['name'] == offset_name or
                    offset['name'][:-1] == offset_name or
                    re.sub(r'\d', '', offset['name']) == offset_name)]

            # A few special cases
            if not self.offsets:
                if offset_name == 'CMPSET':
                    self.offsets = [offset for offset in self.registry['offsets'] if
                                    re.match(r'CMP\wSET', offset['name'])]
                elif offset_name == 'CMPCLR':
                    self.offsets = [offset for offset in self.registry['offsets'] if
                                    re.match(r'CMP\wCLR', offset['name'])]
                if not self.offsets:
                    print(f"Warning: offset {offset_name} not found for reg {self.registry['name']}")
                    print(f"-> possible offsets {[offset['name'] for offset in self.registry['offsets']]}")
                    time.sleep(5)

            for offset in self.offsets:
                offset['title'] = ' '.join(self.last_line.split(' ')[1:])

            raise ContinueException

    def parse_property(self):
        match = re.match(RE_PROPERTY, self.line)
        if match:
            self.offset_description_buffer = []
            raise ContinueException

    @staticmethod
    def convert_range(range_str):
        """
        Convert something like "5:3" to [3, 4, 5]
        But also "3:5" to [3, 4, 5] because the makers of the datasheet just couldn't quite hold
        an uniform approach to documenting things
        """
        tok = range_str.split(':')
        if int(tok[0]) > int(tok[1]):
            tok = reversed(tok)
        start, end = [int(b) for b in tok]
        return [i for i in range(start, end+1)]

    def parse_and_prepare_next_description(self):
        match = re.match(RE_BIT_MATCH, self.line)
        if isinstance(self.offset_description_buffer, list) and match:
            description = '\n'.join(self.offset_description_buffer) if self.offset_description_buffer else None
            for offset in self.offsets:
                print(f" -- Set offset description: {description}")
                offset['description'] = description
            # No continue here, gotta keep processing the line
            self.offset_description_buffer = False

        if isinstance(self.offset_description_buffer, list):
            self.offset_description_buffer.append(self.line)
            raise ContinueException

    def parse_field_title(self):
        match = re.match(RE_FIELD_TITLE, self.line)
        if match:
            self.store_field()
            field_bits = match.groupdict()['bits']
            if ',' in field_bits:

                try:
                    field_bits = [int(bit.strip()) for bit in field_bits.split(',')]
                except ValueError: # Surprise, format can also be "Bits 0:3, 4:7!"
                    unrolled_field_bits = []
                    for range_str in field_bits.split(','):
                        unrolled_field_bits += self.convert_range(range_str)
                    field_bits = list(set(unrolled_field_bits))

            elif ':' in field_bits:
                field_bits = self.convert_range(field_bits)
            else:
                field_bits = [int(field_bits)]

            fields = [field for offset in self.offsets for field in offset['fields']]
            matching_fields = []
            for offset in self.offsets:
                fields = offset['fields']
                field_start_bit = 0
                if offset['name'] == 'SYSCFG1' or fields[0].get('name') == 'GPIOR':
                    print("oof")
                for field in reversed(fields):
                    field_size = field.get('size', 1)
                    for field_bit in field_bits:
                        if field_start_bit <= field_bit < field_start_bit + field_size:
                            matching_fields.append(field)
                            break
                    field_start_bit += field_size
            self.fields = matching_fields
            field_title = match.groupdict()['title']
            if field_title == "GPIO Register byte":
                print("HUOMIO")

            if not self.fields:
                print(
                    f"Warning: Unable to assign bits to registry {self.registry['name']}, offset {self.offsets[0]['name']}")
                time.sleep(5)
            elif len(self.fields) == 1:
                print('   - Field', self.fields[0]['name'], 'title', field_title)
            else:
                print('   - Fields', ", ".join([field.get('name', '?') for field in self.fields]), 'title', field_title)

            for field in self.fields:
                field['title'] = field_title
            self.field_description_buffer = []
            self.field_table_row_buffer = []
            self.field_table_mode = FieldTableMode.INACTIVE
            # TODO should probably do something here, huh?
            raise ContinueException

    def parse_end_of_field(self):
        if (self.line == 'ATtiny214/414/814' or (
                re.match(r'\d', self.line) and self.field_table_mode == FieldTableMode.INACTIVE)):
            self.store_field()

    def parse_fields(self):
        if self.fields:
            print("       - accu field desc:", self.line)
            if self.line == "Value Division":
                raise ContinueException  # hack
            if self.field_table_mode == FieldTableMode.DOUBLE:
                if re.match(r'\d', self.line) or self.line.lower().startswith('other'):
                    ftok = self.line.split(' ')
                    description = ' '.join(ftok[1:])
                    self.field_table_row_buffer.append([ftok[0], description])
                else:
                    print("LINE IS", self.line)
                    print("BUFFER", self.field_table_row_buffer)
                    self.field_table_row_buffer[-1][-1] += f'<br>{self.line}'
                # field_description_buffer.append(f'| {ftok[0]} | {description} |\n')
            elif self.field_table_mode == FieldTableMode.TRIPLE:
                if re.match(r'\d', self.line) or self.line.lower().startswith('other'):
                    ftok = self.line.split(' ')
                    description = ' '.join(ftok[2:])
                    print("FTOK", ftok)
                    self.field_table_row_buffer.append([ftok[0], ftok[1], description])
                else:
                    self.field_table_row_buffer[-1][-1] += f'<br>{self.line}'
                # field_description_buffer.append(f'| {ftok[0]} | {ftok[1]} | {description} |\n')

            elif re.match('Value Description', self.line):
                self.field_table_mode = FieldTableMode.DOUBLE
                self.field_description_buffer.append('\n')
                self.field_description_buffer.append('| Value | Description |\n')
                self.field_description_buffer.append('| ----- | ----------- |\n')
            elif re.match('Value Name Description', self.line):
                self.field_table_mode = FieldTableMode.TRIPLE
                self.field_description_buffer.append('\n')
                self.field_description_buffer.append('| Value | Name | Description |\n')
                self.field_description_buffer.append('| ----- | ---- | ----------- |\n')
            else:
                self.field_description_buffer.append(self.line)
                # TODO table mode
            # time.sleep(1)
            raise ContinueException

    def store_field(self):
        if self.fields:
            if self.field_table_row_buffer:
                buf = [f'| {"|".join(row)} |\n' for row in self.field_table_row_buffer]
                self.field_description_buffer += buf
                self.field_table_row_buffer = []
            if self.field_description_buffer:
                for field in self.fields:
                    field['description'] = ' '.join(self.field_description_buffer)
                self.field_description_buffer = None
            self.field_table_mode = FieldTableMode.INACTIVE
            self.fields = None

    def parse(self, f: TextIO, regs):
        self.regs = regs
        for line in f:
            line = line.strip()
            self.last_line = self.line
            self.line = line
            if not line:
                continue

            # Skip ToC lines
            elif '....' in line:
                continue

            # Skip related links lists
            if line == 'Related Links':
                self.interrupt = Interrupt.related_links
                continue

            elif self.interrupt == Interrupt.related_links:
                if re.match(RE_STARTSWITH_DIGIT, line):
                    continue
                self.interrupt = None

            try:
                self.parse_registry()
                self.parse_offset()
                self.parse_property()
                self.parse_and_prepare_next_description()
                self.parse_field_title()
                self.parse_end_of_field()
                self.parse_fields()

            except ContinueException:
                continue


class TestOutput(unittest.TestCase):
    def setUp(self):
        self.parser = Parser()
        with open('output.json', 'r', encoding='utf-8') as f:
            self.regs = json.load(f)['regs']
        with open('datasheet.txt', 'r', encoding='utf-8') as f:
            self.parser.parse(f, self.regs)

    def test_16bit_register(self):
        tca = [reg for reg in self.regs if reg['name'] == 'TCA'][0]
        tca_per = [offset for offset in tca['offsets'] if offset['name'] == 'PER'][0]
        self.assertEqual(tca_per['title'], 'Period Register - Normal Mode')
        self.assertEqual(len(tca_per['fields']), 2)
        high_per, low_per = tca_per['fields']
        self.assertEqual(high_per['title'], 'Periodic high byte')
        self.assertEqual(high_per['description'], 'These bits hold the MSB of the 16-bit period register.')
        self.assertEqual(low_per['title'], 'Periodic low byte')
        self.assertEqual(low_per['description'], 'These bits hold the LSB of the 16-bit period register.')

    def test_multibits_sequence_table(self):
        # Some fields are described in the datasheet as
        # Bits 4, 5, 6, 7 – CMPEN Compare x Enable
        tcd = [reg for reg in self.regs if reg['name'] == 'FUSE'][0]
        tca_cfg = [offset for offset in tcd['offsets'] if offset['name'] == 'TCD0CFG'][0]
        cmpden = tca_cfg['fields'][0]
        self.assertEqual(cmpden['name'], 'CMPDEN')
        self.assertEqual(cmpden['title'], 'Compare x Enable')

    def test_multibits_range_table(self):
        # Some fields are described in the datasheet as
        # Bits 3:2 – ACTIVE[1:0] Active
        bod = [reg for reg in self.regs if reg['name'] == 'BOD'][0]
        bod_ctrla = [offset for offset in bod['offsets'] if offset['name'] == 'CTRLA'][0]
        active = bod_ctrla['fields'][2]
        self.assertEqual(active['name'], 'ACTIVE')
        self.assertEqual(active['title'], 'Active')

    def test_singlebit(self):
        # Bit 4 – SAMPFREQ Sample Frequency
        bod = [reg for reg in self.regs if reg['name'] == 'BOD'][0]
        bod_ctrla = [offset for offset in bod['offsets'] if offset['name'] == 'CTRLA'][0]
        sampfreq = bod_ctrla['fields'][1]
        self.assertEqual(sampfreq['name'], 'SAMPFREQ')
        self.assertEqual(sampfreq['title'], 'Sample Frequency')

    def test_offset_description(self):
        twi = [reg for reg in self.regs if reg['name'] == 'TWI'][0]
        twi_mstatus = [offset for offset in twi['offsets'] if offset['name'] == 'MSTATUS'][0]
        self.assertIn("Normal TWI operation dictates", twi_mstatus['description'])



if __name__ == '__main__':
    #unittest.main()
    parser = Parser()
    with open('output.json', 'r', encoding='utf-8') as f:
        regs = json.load(f)['regs']

    with open('datasheet.txt', 'r', encoding='utf-8') as f:
        parser.parse(f, regs)

    with open('rich-output.json', 'w', encoding='utf-8') as f:
        json.dump({'regs': regs}, f, indent=2)
