# ATtinyx14 software notes

## Configuration

### Main clock
The ATtiny boots up with the 16/20 MHz oscillator (OSC20M) and a prescaler division factor of 6 <sup>\[[datasheet](http://ww1.microchip.com/downloads/en/DeviceDoc/ATtiny214-414-814-DataSheet-DS40001912C.pdf#page=74)\]</sup>. OSC20M frequency is set by frequency select bits (FREQSEL, default 0x0 = 20 MHz) of the oscillator configurator fuse (FUSE.OSCCFG). Shortly put, the ATtiny boots up by default running at 3.33 MHz. To get it to run at 20 MHz, the prescaler needs to be disabled via register [CLKCTRL](http://ww1.microchip.com/downloads/en/DeviceDoc/ATtiny214-414-814-DataSheet-DS40001912C.pdf#page=78). And to do that, the configuration change protection must be disabled via [CPU register](http://ww1.microchip.com/downloads/en/DeviceDoc/ATtiny214-414-814-DataSheet-DS40001912C.pdf#page=52).

```c
CPU_CCP = CCP_IOREG_gc; // Disable CCP for I/O registers, will enable automatically after 4 instructions
CLKCTRL_MCLKCTRLB = 0; // Get rid of prescaler, lets roll 20 MHz
```
