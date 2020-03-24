import json
import re
import time
from enum import auto, Enum


class FieldTableMode(Enum):
    INACTIVE = auto()
    DOUBLE = auto()
    TRIPLE = auto()

re_registry_name = r'.+ Summary - (?P<registry_name>.+)'
re_offset_name = r'Name:\u2000 (?P<offset_name>.+)'
re_property = r'Property:\u2000'
re_bit_match = r'Bit \d+ \d+ \d+'
re_field_title = r'Bits? \d(:\d)?\s–\s(?P<field_name>.+?)(?:\[.+?\])?\s+(?P<field_title>.+)'
re_number_start = r'\d'
def fix_registry_names(registry_name):
    if registry_name == 'TCA in Split Mode (CTRLD.SPLITM=1)':
        return 'TCA-SPLIT'
    elif registry_name == 'TCA in Normal Mode (CTRLD.SPLITM=0)':
        return 'TCA'
    return registry_name

class Parser(object):
    def __init__(self):
        self.registry = None
        self.offsets = None
        self.fields = None
        self.description_buffer = False
        self.last_line = None
        self.skip_related_links = False
        self.field_table_mode = FieldTableMode.INACTIVE
        self.field_table_row_buffer = []
        self.field_description_buffer = []

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

    def run(self):
        with open('output.json', 'r', encoding='utf-8') as f:
            regs = json.load(f)['regs']

        with open('datasheet.txt', 'r', encoding='utf-8') as f:
            for line in f.readlines():
                line = line.strip()
                if '....' in line:
                    continue
                if line == 'Related Links':
                    self.skip_related_links = True
                    continue
                elif self.skip_related_links:
                    if re.match(r'^\d', line):
                        continue
                    self.skip_related_links = False

                match = re.match(re_registry_name, line)
                if match:
                    registry_name = fix_registry_names(match.groupdict()['registry_name'])
                    print("Parsing registry:", registry_name)
                    self.registry = [reg for reg in regs if reg['name'] == registry_name][0]
                    continue

                match = re.match(re_offset_name, line)
                if match:
                    offset_name = match.groupdict()['offset_name']
                    print(" - Parsing offset:", offset_name)
                    self.offsets = [offset for offset in self.registry['offsets'] \
                               if offset['name'] == offset_name or \
                               offset['name'][:-1] == offset_name or \
                               offset['name'][:-1] == offset_name[:-1] or \
                               re.sub(r'\d', '', offset['name']) == offset_name]
                    if not self.offsets:

                        if offset_name == 'CMPSET':
                            self.offsets = [offset for offset in self.registry['offsets'] if re.match(r'CMP\wSET', offset['name'])]
                        elif offset_name == 'CMPCLR':
                            self.offsets = [offset for offset in self.registry['offsets'] if re.match(r'CMP\wCLR', offset['name'])]
                        if not self.offsets:
                            print("warrrning, offset", offset_name, "not found for reg", self.registry['name'])
                            print("* possible offsets", [offset['name'] for offset in self.registry['offsets']])
                            time.sleep(1)
                    for offset in self.offsets:
                        offset['title'] = ' '.join(last_line.split(' ')[1:])

                    continue

                match = re.match(re_property, line)
                if match:
                    self.description_buffer = []
                    continue

                match = re.match(re_bit_match, line)
                if self.description_buffer is not False and match:
                    description = '\n'.join(self.description_buffer) if self.description_buffer else None
                    for offset in self.offsets:
                        print(" - Set description: ", description)
                        offset['description'] = description
                    # No continue here, gotta keep processing the line
                    self.description_buffer = False

                if self.description_buffer is not False:
                    self.description_buffer.append(line)
                    continue

                match = re.match(re_field_title, line)
                if match:
                    self.store_field()
                    field_name = match.groupdict()['field_name']
                    field_title = match.groupdict()['field_title']
                    print('   - Field', field_name, 'title', field_title)
                    self.fields = [field for offset in self.offsets for field in offset['fields'] if field.get('name') == field_name]
                    if not self.fields:
                        print("WARRRNING", field_name, "not found in ", self.registry['name'], self.offsets[0]['name'])
                        print("Options", [field.get('name') for offset in self.offsets for field in offset['fields']])
                        time.sleep(1)
                    for field in self.fields:
                        field['title'] = field_title
                    self.field_description_buffer = []
                    self.field_table_row_buffer = []
                    self.field_table_mode = FieldTableMode.INACTIVE
                    # TODO should probably do something here, huh?
                    continue

                if line == 'ATtiny214/414/814' or (re.match(r'\d', line) and self.field_table_mode == FieldTableMode.INACTIVE):
                    self.store_field()

                if self.fields:
                    print("       - accu field desc:", line)
                    if line == "Value Division":
                        continue # hack
                    if self.field_table_mode == FieldTableMode.DOUBLE:
                        if re.match(r'\d', line):
                            ftok = line.split(' ')
                            description = ' '.join(ftok[1:])
                            self.field_table_row_buffer.append([ftok[0], description])
                        else:
                            print("LINE IS" ,line)
                            print("BUFFER", self.field_table_row_buffer)
                            self.field_table_row_buffer[-1][-1] += f'\n{line}'
                        #field_description_buffer.append(f'| {ftok[0]} | {description} |\n')
                    elif self.field_table_mode == FieldTableMode.TRIPLE:
                        if re.match(r'\d', line):
                            ftok = line.split(' ')
                            description = ' '.join(ftok[2:])
                            print("FTOK", ftok)
                            self.field_table_row_buffer.append([ftok[0], ftok[1], description])
                        else:
                            self.field_table_row_buffer[-1][-1] += f'\n{line}'
                        #field_description_buffer.append(f'| {ftok[0]} | {ftok[1]} | {description} |\n')

                    elif re.match('Value Description', line):
                        self.field_table_mode = FieldTableMode.DOUBLE
                        self.field_description_buffer.append('\n')
                        self.field_description_buffer.append('| Value | Description |\n')
                        self.field_description_buffer.append('| ----- | ----------- |\n')
                    elif re.match('Value Name Description', line):
                        self.field_table_mode = FieldTableMode.TRIPLE
                        self.field_description_buffer.append('\n')
                        self.field_description_buffer.append('| Value | Name | Description |\n')
                        self.field_description_buffer.append('| ----- | ---- | ----------- |\n')
                    else:
                        self.field_description_buffer.append(line)
                        # TODO table mode
                    #time.sleep(1)
                    continue

                last_line = line
        with open('rich-output.json', 'w', encoding='utf-8') as f:
            json.dump({'regs': regs}, f, indent=2)


if __name__ == '__main__':
    parser = Parser()
    parser.run()
