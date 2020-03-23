import json
import re
from enum import Enum, auto

import toml


class State(Enum):
    SINGLE = auto()
    MULTILINE = auto()
    RESERVED = auto()
    MULTIBYTE = auto()


def parse_fields(raw_fields):
    fields = []
    empty_space = 0
    for field in raw_fields:
        if field == '-':
            empty_space += 1
            continue
        elif empty_space:
            if empty_space > 1:
                fields.append({'size': empty_space})
            else:
                fields.append({})
            empty_space = 0

        size = 1
        match = re.match(r'(?P<field_name>.+?)(\[(?P<high_byte>\d+):(?P<low_byte>\d+)\]|$)', field)

        gd = match.groupdict()
        field_name = gd.get('field_name')
        high_byte = gd.get('high_byte')
        low_byte = gd.get('low_byte')
        if high_byte is not None and low_byte is not None:
            size = int(gd['high_byte']) - int(gd['low_byte']) + 1

        if size > 1:
            fields.append({
                'name': field_name,
                'size': size,
            })
        else:
            fields.append({'name': field_name})

    total_size = sum([f.get('size', 1) for f in fields])
    if total_size < 8:
        fields = [{}] * (8 - total_size) + fields
    return fields


def load_registry_offsets(filename):
    with open(filename, 'r') as f:
        state = State.SINGLE
        offsets = []
        offset = None
        for line in f.readlines():
            line = line.strip()
            if not line:
                continue
            tok = line.split(' ')
            if state == State.MULTIBYTE:
                if re.match(r'\d+:\d+', tok[0]):
                    offset['fields'] += parse_fields(tok[1:])
                    continue
                else:
                    print(f"Append multi-offset {offset['name']} @ {offset['offset']}")
                    print(f" * {offset['fields']}")
                    state = State.SINGLE

            if state == State.RESERVED:
                if tok[0] == 'Reserved':
                    state = State.SINGLE
                    print("Skip reserved")
                    continue
                else:
                    continue
            if len(tok) == 1:
                state = State.RESERVED
                continue
            elif len(tok) == 2:
                if (tok[1]) == 'Reserved':
                    print("Skip reserved")
                    continue
                state = State.MULTIBYTE
                print("Ready for multibyte", tok)
                offset = {
                    'offset': tok[0],
                    'name': tok[1],
                    'fields': []
                }
                offsets.append(offset)
                continue

            fields = parse_fields(tok[3:])
            print(f"Append offset {tok[1]} @ {tok[0]}")
            print(f" * {fields}")
            offsets.append({
                'offset': tok[0],
                'name': tok[1],
                'fields': fields
            })
    return offsets


def run():
    with open('parse_reg_tables.toml', 'r') as f:
        regs = toml.load(f).get('regs', [])

    for reg in regs:
        print('Process registry:', reg)
        reg['offsets'] = load_registry_offsets(f'tables/{reg["name"]}.txt')

    with open('output.json', 'w') as f:
        json.dump({'regs': regs}, f, indent=2)
    with open('output.toml', 'w') as f:
        toml.dump({'regs': regs}, f)


if __name__ == '__main__':
    run()
