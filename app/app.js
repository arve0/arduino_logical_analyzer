const plot = require('./plot');
const voltageLines = require('./voltage-lines');
const serial = require('./serial');
const control = require('./control');

const state = require('./state')();

serial();
let interval = setInterval(draw, 20);

function draw () {
  state.container.style.width = state.measurements[0].length + 'px';
  state.container.innerHTML = '';
  for (let ch = 0; ch < state.channels; ch += 1) {
    state.container.insertAdjacentHTML('beforeend', plot(ch));
  }
  state.container.insertAdjacentHTML('beforeend', voltageLines(state));
  state.container.insertAdjacentHTML('beforeend', control());
  window.scrollTo(state.measurements[0].length, 0);
}

function stop () {  // eslint-disable-line
  clearInterval(interval);
  serial.stop();
}
