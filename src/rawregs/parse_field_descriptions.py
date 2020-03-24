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

def run():
    with open('output.json', 'r', encoding='utf-8') as f:
        regs = json.load(f)['regs']
    registry = None
    offsets = None
    fields = None
    description_buffer = False
    last_line = None
    skip_related_links = False
    field_table_mode = FieldTableMode.INACTIVE
    field_table_row_buffer = []
    field_description_buffer = False
    with open('datasheet.txt', 'r', encoding='utf-8') as f:
        for line in f.readlines():
            line = line.strip()
            if '....' in line:
                continue
            if line == 'Related Links':
                skip_related_links = True
                continue
            elif skip_related_links:
                if re.match(r'^\d', line):
                    continue
                skip_related_links = False

            match = re.match(re_registry_name, line)
            if match:
                registry_name = fix_registry_names(match.groupdict()['registry_name'])
                print("Parsing registry:", registry_name)
                registry = [reg for reg in regs if reg['name'] == registry_name][0]
                continue

            match = re.match(re_offset_name, line)
            if match:
                offset_name = match.groupdict()['offset_name']
                print(" - Parsing offset:", offset_name)
                offsets = [offset for offset in registry['offsets'] \
                          if offset['name'] == offset_name or \
                          offset['name'][:-1] == offset_name or \
                          offset['name'][:-1] == offset_name[:-1] or \
                          re.sub(r'\d', '', offset['name']) == offset_name]
                if not offsets:

                    if offset_name == 'CMPSET':
                        offsets = [offset for offset in registry['offsets'] if re.match(r'CMP\wSET', offset['name'])]
                    elif offset_name == 'CMPCLR':
                        offsets = [offset for offset in registry['offsets'] if re.match(r'CMP\wCLR', offset['name'])]
                    if not offsets:
                        print("warrrning, offset", offset_name, "not found for reg", registry['name'])
                        print("* possible offsets", [offset['name'] for offset in registry['offsets']])
                        time.sleep(1)
                for offset in offsets:
                    offset['title'] = ' '.join(last_line.split(' ')[1:])

                continue

            match = re.match(re_property, line)
            if match:
                description_buffer = []
                continue

            match = re.match(re_bit_match, line)
            if description_buffer is not False and match:
                description = '\n'.join(description_buffer) if description_buffer else None
                for offset in offsets:
                    print(" - Set description: ", description)
                    offset['description'] = description
                # No continue here, gotta keep processing the line
                description_buffer = False

            if description_buffer is not False:
                description_buffer.append(line)
                continue

            match = re.match(re_field_title, line)
            if match:
                field_name = match.groupdict()['field_name']
                field_title = match.groupdict()['field_title']
                print('   - Field', field_name, 'title', field_title)
                fields = [field for offset in offsets for field in offset['fields'] if field.get('name') == field_name]
                if not fields:
                    print("WARRRNING", field_name, "not found in ", registry['name'], offsets[0]['name'])
                    print("Options", [field.get('name') for offset in offsets for field in offset['fields']])
                    time.sleep(1)
                for field in fields:
                    field['title'] = field_title
                field_description_buffer = []
                field_table_row_buffer = []
                field_table_mode = FieldTableMode.INACTIVE
                # TODO should probably do something here, huh?
                continue

            if line == 'ATtiny214/414/814' or (re.match(r'\d', line) and field_table_mode == FieldTableMode.INACTIVE):
                if field_table_row_buffer:
                    buf = [f'| {"|".join(row)} |\n' for row in field_table_row_buffer]
                    field_description_buffer += buf
                    field_table_row_buffer = []
                if field_description_buffer:
                    for field in fields:
                        field['description'] = ' '.join(field_description_buffer)
                    field_description_buffer = None
                field_table_mode = FieldTableMode.INACTIVE

                fields = None

            if fields:
                print("       - accu field desc:", line)
                if line == "Value Division":
                    continue # hack
                if field_table_mode == FieldTableMode.DOUBLE:
                    if re.match(r'\d', line):
                        ftok = line.split(' ')
                        description = ' '.join(ftok[1:])
                        field_table_row_buffer.append([ftok[0], description])
                    else:
                        print("LINE IS" ,line)
                        print("BUFFER", field_table_row_buffer)
                        field_table_row_buffer[-1][-1] += f'\n{line}'
                    #field_description_buffer.append(f'| {ftok[0]} | {description} |\n')
                elif field_table_mode == FieldTableMode.TRIPLE:
                    if re.match(r'\d', line):
                        ftok = line.split(' ')
                        description = ' '.join(ftok[2:])
                        print("FTOK", ftok)
                        field_table_row_buffer.append([ftok[0], ftok[1], description])
                    else:
                        field_table_row_buffer[-1][-1] += f'\n{line}'
                    #field_description_buffer.append(f'| {ftok[0]} | {ftok[1]} | {description} |\n')

                elif re.match('Value Description', line):
                    field_table_mode = FieldTableMode.DOUBLE
                    field_description_buffer.append('\n')
                    field_description_buffer.append('| Value | Description |\n')
                    field_description_buffer.append('| ----- | ----------- |\n')
                elif re.match('Value Name Description', line):
                    field_table_mode = FieldTableMode.TRIPLE
                    field_description_buffer.append('\n')
                    field_description_buffer.append('| Value | Name | Description |\n')
                    field_description_buffer.append('| ----- | ---- | ----------- |\n')
                else:
                    field_description_buffer.append(line)
                    # TODO table mode
                #time.sleep(1)
                continue

            last_line = line
    with open('rich-output.json', 'w', encoding='utf-8') as f:
        json.dump({'regs': regs}, f, indent=2)


if __name__ == '__main__':
    run()
