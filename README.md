# ATtinyx14 software notes

## Configuration

### Main clock
The ATtiny boots up with the 16/20 MHz oscillator (OSC20M) and a prescaler division factor of 6 ^\[[datasheet](datasheet.pdf?page=74)]. OSC20M frequency is set by frequency select bits (FREQSEL, default 0x0 = 20 MHz) of the oscillator configurator fuse (FUSE.OSCCFG). Shortly put, the ATtiny boots up by default running at 3.33 MHz. To get it to run at 20 MHz, the prescaler needs to be disabled.
