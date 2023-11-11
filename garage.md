red, blue, green, white

PA0: opp/ned rask, 3.5V idle
PA1: ? oscillerer 3.5V - 5V
PA2: ? oscillerer 3.5V - 5V
PA3: opp/ned rask, 0V idle
PA4: opp rask & treg
PA5: ned rask & treg
PA6: ? 5V konstant ? kontakt?
PA7: relé varsellampe
PB0: last motor
PB1: ? oscillerer mellom 0V og 5V ved motor
PB2: 4.4 idle, 4.85 STOPP ned
PB3: ? oscillerer mellom 0V og 5V
PB4: bryter P2?
PB5: ? oscillerer mellom 0V og 5V
PB6: 4.4 idle, 4.85 STOPP opp
PB7: ? oscillerer mellom 0V og 5V
PC4: trådløs, 5V idle
PC5: trådløs,
PC6: trådløs,
PC7: trådløs,

Kontrollknapper?
LED?

Hva trengs:
- [x] Opp PA4
- [x] Ned PA5
- [x] Rask PA0 + PA3
- [x] Overlast PB0
- [x] Topp PB6, Bunn PB2
- [x] Trådløs, ekstern, NO, resettes til NO ved strømbrudd


Constants
- load measurements
- high load
- high load start
- reverse time
- low speed time
- input pins
  - top
  - bottom
  - wireless
  - load
- output pins
  - up
  - down
  - fast

State:
- inputs
  - wireless, bool
  - top, bool
  - bottom, bool
  - load, int
- motor
  - direction, int
  - running, bool
  - have been stopped, bool
  - high speed, bool
  - position, long
  - total time high speed
  - total time low speed
- timers
  - last millis, unsigned long
  - since start, unsigned long
  - prev stats time, unsigned long
  - high speed time
  - low speed time
- internal
  - show stats, bool
  - high speed factor
- calibrate
  - total time low speed
  - total time high speed

Update state:
- read inputs
- update state
  - reset have been stopped

Act on state:
- start?
  - !running
  - !haveBeenStopped
  - wireless
  - direction == up?
    - input bottom?
      - position = 0
  - direction == down?
    - input top?
      - position = total time
  - since start = 0
- change speed
  - low -> high: start time > threshold
  - high -> low: direction up and position > threshold
  - high -> low: direction down and position < threshold
- stop?
  - running?
  - wireless
  - high load
    - reverse, time = min(reverse time, since start)
  - top and direction up
  - bottom and direction down

