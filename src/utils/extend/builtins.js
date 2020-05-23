import literals from "./literals";

/*****************************************************************************
 *
 * Copyright (C) 2020 Atmel Corporation, a wholly owned subsidiary of Microchip Technology Inc.
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * Modified 2020 by Matti Eiden
 * Changes: Modified to JS parseable format
 ****************************************************************************/

const builtIns = [
  'CCP',
  'SPH',
  'SPL',
  'SREG',
  'GPIOR0',
  'GPIOR1',
  'GPIOR2',
  'GPIOR3',
  'GPIO0',
  'GPIO1',
  'GPIO2',
  'GPIO3',
  'VPORTA_DIR',
  'VPORTA_OUT',
  'VPORTA_IN',
  'VPORTA_INTFLAGS',
  'VPORTB_DIR',
  'VPORTB_OUT',
  'VPORTB_IN',
  'VPORTB_INTFLAGS',
  'VPORTC_DIR',
  'VPORTC_OUT',
  'VPORTC_IN',
  'VPORTC_INTFLAGS',
  'GPIO_GPIOR0',
  'GPIO_GPIOR1',
  'GPIO_GPIOR2',
  'GPIO_GPIOR3',
  'GPIO_GPIO0',
  'GPIO_GPIO1',
  'GPIO_GPIO2',
  'GPIO_GPIO3',
  'CPU_CCP',
  'CPU_SPL',
  'CPU_SPH',
  'CPU_SREG',
  'RSTCTRL_RSTFR',
  'RSTCTRL_SWRR',
  'SLPCTRL_CTRLA',
  'CLKCTRL_MCLKCTRLA',
  'CLKCTRL_MCLKCTRLB',
  'CLKCTRL_MCLKLOCK',
  'CLKCTRL_MCLKSTATUS',
  'CLKCTRL_OSC20MCTRLA',
  'CLKCTRL_OSC20MCALIBA',
  'CLKCTRL_OSC20MCALIBB',
  'CLKCTRL_OSC32KCTRLA',
  'CLKCTRL_XOSC32KCTRLA',
  'BOD_CTRLA',
  'BOD_CTRLB',
  'BOD_VLMCTRLA',
  'BOD_INTCTRL',
  'BOD_INTFLAGS',
  'BOD_STATUS',
  'VREF_CTRLA',
  'VREF_CTRLB',
  'WDT_CTRLA',
  'WDT_STATUS',
  'CPUINT_CTRLA',
  'CPUINT_STATUS',
  'CPUINT_LVL0PRI',
  'CPUINT_LVL1VEC',
  'CRCSCAN_CTRLA',
  'CRCSCAN_CTRLB',
  'CRCSCAN_STATUS',
  'RTC_CTRLA',
  'RTC_STATUS',
  'RTC_INTCTRL',
  'RTC_INTFLAGS',
  'RTC_TEMP',
  'RTC_DBGCTRL',
  'RTC_CLKSEL',
  'RTC_CNTL',
  'RTC_CNTH',
  'RTC_PERL',
  'RTC_PERH',
  'RTC_CMPL',
  'RTC_CMPH',
  'RTC_PITCTRLA',
  'RTC_PITSTATUS',
  'RTC_PITINTCTRL',
  'RTC_PITINTFLAGS',
  'RTC_PITDBGCTRL',
  'EVSYS_ASYNCSTROBE',
  'EVSYS_SYNCSTROBE',
  'EVSYS_ASYNCCH0',
  'EVSYS_ASYNCCH1',
  'EVSYS_ASYNCCH2',
  'EVSYS_ASYNCCH3',
  'EVSYS_SYNCCH0',
  'EVSYS_SYNCCH1',
  'EVSYS_ASYNCUSER0',
  'EVSYS_ASYNCUSER1',
  'EVSYS_ASYNCUSER2',
  'EVSYS_ASYNCUSER3',
  'EVSYS_ASYNCUSER4',
  'EVSYS_ASYNCUSER5',
  'EVSYS_ASYNCUSER6',
  'EVSYS_ASYNCUSER7',
  'EVSYS_ASYNCUSER8',
  'EVSYS_ASYNCUSER9',
  'EVSYS_ASYNCUSER10',
  'EVSYS_SYNCUSER0',
  'EVSYS_SYNCUSER1',
  'CCL_CTRLA',
  'CCL_SEQCTRL0',
  'CCL_LUT0CTRLA',
  'CCL_LUT0CTRLB',
  'CCL_LUT0CTRLC',
  'CCL_TRUTH0',
  'CCL_LUT1CTRLA',
  'CCL_LUT1CTRLB',
  'CCL_LUT1CTRLC',
  'CCL_TRUTH1',
  'PORTMUX_CTRLA',
  'PORTMUX_CTRLB',
  'PORTMUX_CTRLC',
  'PORTMUX_CTRLD',
  'PORTA_DIR',
  'PORTA_DIRSET',
  'PORTA_DIRCLR',
  'PORTA_DIRTGL',
  'PORTA_OUT',
  'PORTA_OUTSET',
  'PORTA_OUTCLR',
  'PORTA_OUTTGL',
  'PORTA_IN',
  'PORTA_INTFLAGS',
  'PORTA_PIN0CTRL',
  'PORTA_PIN1CTRL',
  'PORTA_PIN2CTRL',
  'PORTA_PIN3CTRL',
  'PORTA_PIN4CTRL',
  'PORTA_PIN5CTRL',
  'PORTA_PIN6CTRL',
  'PORTA_PIN7CTRL',
  'PORTB_DIR',
  'PORTB_DIRSET',
  'PORTB_DIRCLR',
  'PORTB_DIRTGL',
  'PORTB_OUT',
  'PORTB_OUTSET',
  'PORTB_OUTCLR',
  'PORTB_OUTTGL',
  'PORTB_IN',
  'PORTB_INTFLAGS',
  'PORTB_PIN0CTRL',
  'PORTB_PIN1CTRL',
  'PORTB_PIN2CTRL',
  'PORTB_PIN3CTRL',
  'PORTB_PIN4CTRL',
  'PORTB_PIN5CTRL',
  'PORTB_PIN6CTRL',
  'PORTB_PIN7CTRL',
  'ADC0_CTRLA',
  'ADC0_CTRLB',
  'ADC0_CTRLC',
  'ADC0_CTRLD',
  'ADC0_CTRLE',
  'ADC0_SAMPCTRL',
  'ADC0_MUXPOS',
  'ADC0_COMMAND',
  'ADC0_EVCTRL',
  'ADC0_INTCTRL',
  'ADC0_INTFLAGS',
  'ADC0_DBGCTRL',
  'ADC0_TEMP',
  'ADC0_RESL',
  'ADC0_RESH',
  'ADC0_WINLTL',
  'ADC0_WINLTH',
  'ADC0_WINHTL',
  'ADC0_WINHTH',
  'ADC0_CALIB',
  'AC0_CTRLA',
  'AC0_MUXCTRLA',
  'AC0_INTCTRL',
  'AC0_STATUS',
  'DAC0_CTRLA',
  'DAC0_DATA',
  'USART0_RXDATAL',
  'USART0_RXDATAH',
  'USART0_TXDATAL',
  'USART0_TXDATAH',
  'USART0_STATUS',
  'USART0_CTRLA',
  'USART0_CTRLB',
  'USART0_CTRLC',
  'USART0_BAUDL',
  'USART0_BAUDH',
  'USART0_DBGCTRL',
  'USART0_EVCTRL',
  'USART0_TXPLCTRL',
  'USART0_RXPLCTRL',
  'TWI0_CTRLA',
  'TWI0_DBGCTRL',
  'TWI0_MCTRLA',
  'TWI0_MCTRLB',
  'TWI0_MSTATUS',
  'TWI0_MBAUD',
  'TWI0_MADDR',
  'TWI0_MDATA',
  'TWI0_SCTRLA',
  'TWI0_SCTRLB',
  'TWI0_SSTATUS',
  'TWI0_SADDR',
  'TWI0_SDATA',
  'TWI0_SADDRMASK',
  'SPI0_CTRLA',
  'SPI0_CTRLB',
  'SPI0_INTCTRL',
  'SPI0_INTFLAGS',
  'SPI0_DATA',
  'TCA0_SINGLE_CTRLA',
  'TCA0_SINGLE_CTRLB',
  'TCA0_SINGLE_CTRLC',
  'TCA0_SINGLE_CTRLD',
  'TCA0_SINGLE_CTRLECLR',
  'TCA0_SINGLE_CTRLESET',
  'TCA0_SINGLE_CTRLFCLR',
  'TCA0_SINGLE_CTRLFSET',
  'TCA0_SINGLE_EVCTRL',
  'TCA0_SINGLE_INTCTRL',
  'TCA0_SINGLE_INTFLAGS',
  'TCA0_SINGLE_DBGCTRL',
  'TCA0_SINGLE_TEMP',
  'TCA0_SPLIT_CTRLA',
  'TCA0_SPLIT_CTRLB',
  'TCA0_SPLIT_CTRLC',
  'TCA0_SPLIT_CTRLD',
  'TCA0_SPLIT_CTRLECLR',
  'TCA0_SPLIT_CTRLESET',
  'TCA0_SPLIT_INTCTRL',
  'TCA0_SPLIT_INTFLAGS',
  'TCA0_SPLIT_DBGCTRL',
  'TCA0_SPLIT_LCNT',
  'TCA0_SPLIT_HCNT',
  'TCA0_SPLIT_LPER',
  'TCA0_SPLIT_HPER',
  'TCA0_SPLIT_LCMP0',
  'TCA0_SPLIT_HCMP0',
  'TCA0_SPLIT_LCMP1',
  'TCA0_SPLIT_HCMP1',
  'TCA0_SPLIT_LCMP2',
  'TCA0_SPLIT_HCMP2',
  'TCB0_CTRLA',
  'TCB0_CTRLB',
  'TCB0_EVCTRL',
  'TCB0_INTCTRL',
  'TCB0_INTFLAGS',
  'TCB0_STATUS',
  'TCB0_DBGCTRL',
  'TCB0_TEMP',
  'TCB0_CNTL',
  'TCB0_CNTH',
  'TCB0_CCMPL',
  'TCB0_CCMPH',
  'TCD0_CTRLA',
  'TCD0_CTRLB',
  'TCD0_CTRLC',
  'TCD0_CTRLD',
  'TCD0_CTRLE',
  'TCD0_EVCTRLA',
  'TCD0_EVCTRLB',
  'TCD0_INTCTRL',
  'TCD0_INTFLAGS',
  'TCD0_STATUS',
  'TCD0_INPUTCTRLA',
  'TCD0_INPUTCTRLB',
  'TCD0_FAULTCTRL',
  'TCD0_DLYCTRL',
  'TCD0_DLYVAL',
  'TCD0_DITCTRL',
  'TCD0_DITVAL',
  'TCD0_DBGCTRL',
  'TCD0_CAPTUREAL',
  'TCD0_CAPTUREAH',
  'TCD0_CAPTUREBL',
  'TCD0_CAPTUREBH',
  'TCD0_CMPASETL',
  'TCD0_CMPASETH',
  'TCD0_CMPACLRL',
  'TCD0_CMPACLRH',
  'TCD0_CMPBSETL',
  'TCD0_CMPBSETH',
  'TCD0_CMPBCLRL',
  'TCD0_CMPBCLRH',
  'SYSCFG_REVID',
  'SYSCFG_EXTBRK',
  'NVMCTRL_CTRLA',
  'NVMCTRL_CTRLB',
  'NVMCTRL_STATUS',
  'NVMCTRL_INTCTRL',
  'NVMCTRL_INTFLAGS',
  'NVMCTRL_DATAL',
  'NVMCTRL_DATAH',
  'NVMCTRL_ADDRL',
  'NVMCTRL_ADDRH',
  'SIGROW_DEVICEID0',
  'SIGROW_DEVICEID1',
  'SIGROW_DEVICEID2',
  'SIGROW_SERNUM0',
  'SIGROW_SERNUM1',
  'SIGROW_SERNUM2',
  'SIGROW_SERNUM3',
  'SIGROW_SERNUM4',
  'SIGROW_SERNUM5',
  'SIGROW_SERNUM6',
  'SIGROW_SERNUM7',
  'SIGROW_SERNUM8',
  'SIGROW_SERNUM9',
  'SIGROW_TEMPSENSE0',
  'SIGROW_TEMPSENSE1',
  'SIGROW_OSC16ERR3V',
  'SIGROW_OSC16ERR5V',
  'SIGROW_OSC20ERR3V',
  'SIGROW_OSC20ERR5V',
  'FUSE_WDTCFG',
  'FUSE_BODCFG',
  'FUSE_OSCCFG',
  'FUSE_TCD0CFG',
  'FUSE_SYSCFG0',
  'FUSE_SYSCFG1',
  'FUSE_APPEND',
  'FUSE_BOOTEND',
  'LOCKBIT_LOCKBIT',
  'USERROW_USERROW0',
  'USERROW_USERROW1',
  'USERROW_USERROW2',
  'USERROW_USERROW3',
  'USERROW_USERROW4',
  'USERROW_USERROW5',
  'USERROW_USERROW6',
  'USERROW_USERROW7',
  'USERROW_USERROW8',
  'USERROW_USERROW9',
  'USERROW_USERROW10',
  'USERROW_USERROW11',
  'USERROW_USERROW12',
  'USERROW_USERROW13',
  'USERROW_USERROW14',
  'USERROW_USERROW15',
  'USERROW_USERROW16',
  'USERROW_USERROW17',
  'USERROW_USERROW18',
  'USERROW_USERROW19',
  'USERROW_USERROW20',
  'USERROW_USERROW21',
  'USERROW_USERROW22',
  'USERROW_USERROW23',
  'USERROW_USERROW24',
  'USERROW_USERROW25',
  'USERROW_USERROW26',
  'USERROW_USERROW27',
  'USERROW_USERROW28',
  'USERROW_USERROW29',
  'USERROW_USERROW30',
  'USERROW_USERROW31',
]

export default builtIns

const registryGroupNames = [
  ['GPIO', 'General Purpose IO'],
  ['CPU', 'CPU'],
  ['RSTCTRL', 'Reset controller'],
  ['SLPCTRL', 'Sleep Controller'],
  ['CLKCTRL', 'Clock controller'],
  ['BOD', 'Bod interface'],
  ['VREF', 'Voltage reference'],
  ['WDT', 'Watch-Dog Timer'],
  ['CPUINT', 'Interrupt Controller'],
  ['CRCSCAN', 'CRCSCAN'],
  ['RTC', 'Real-Time Counter'],
  ['EVSYS', 'Event System'],
  ['CCL', 'Configurable Custom Logic'],
  ['PORTMUX', 'Port Multiplexer'],
  ['SYSCFG', 'System Configuration Registers'],
  ['NVMCTRL', 'Non-volatile Memory Controller'],
  ['SIGROW', 'Signature row'],
  ['FUSE', 'Fuses'],
  ['LOCKBIT', 'Lockbit'],
  ['USERROW', 'User Row'],
  ['AC', 'Analog Comparator'],
  ['ADC', 'Analog to Digital Converter'],
  ['BOD', 'Bod interface'],
  ['CCL', 'Configurable Custom Logic'],
  ['CLKCTRL', 'Clock controller'],
  ['CPU', 'CPU'],
  ['CPUINT', 'Interrupt Controller'],
  ['CRCSCAN', 'CRCSCAN'],
  ['DAC', 'Digital to Analog Converter'],
  ['EVSYS', 'Event System'],
  ['FUSE', 'Fuses'],
  ['LOCKBIT', 'Lockbit'],
  ['NVMCTRL', 'Non-volatile Memory Controller'],
  ['PORT', 'I/O Ports'],
  ['PORTMUX', 'Port Multiplexer'],
  ['RSTCTRL', 'Reset controller'],
  ['RTC', 'Real-Time Counter'],
  ['SLPCTRL', 'Sleep Controller'],
  ['SPI', 'Serial Peripheral Interface'],
  ['SYSCFG', 'System Configuration Registers'],
  ['TCA', '16-bit Timer/Counter Type A'],
  ['TCB', '16-bit Timer Type B'],
  ['TCD', 'Timer Counter D'],
  ['TWI', 'Two-Wire Interface'],
  ['USART', 'Universal Synchronous and Asynchronous Receiver and Transmitter'],
  ['VPORT', 'Virtual Ports'],
  ['VREF', 'Voltage reference'],
  ['WDT', 'Watch-Dog Timer'],
]

const registryGroupMap = registryGroupNames.reduce((acc, rg) => {
  acc[rg[0]] = rg
  return acc
}, {})

export {registryGroupNames, registryGroupMap}