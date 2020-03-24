parse_reg_tables.py
-----

This tool will read registry table definitions from the `tables` subfolder and produce `output.json` with the basic registry structure


parse_field_descriptions.py
------

This tool will take the `output.json` produced in previous step and fill it with extra information from the datasheet. The datasheet is brutally copypasted into `datasheet.txt` but thankfully it has a rather consistent format which allows parsing verbose names for offsets, offset descriptions, verbose names for bit fields and bit field descriptions.

The tool will output `rich_output.json` which can be consumed as is by the main software.  