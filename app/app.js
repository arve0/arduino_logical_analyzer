const line = require('./line.js');
const serial = require('./serial');

const BUFFER = 2048;

const state = {  // global state
  size: getSize(),
  points: [],
  container: document.getElementById('container')
};

window.onresize = () => state.size = getSize();
function getSize () {
  return { x: window.innerWidth, y: window.innerHeight };
}

let interval = setInterval(() => {
  if (state.points.length > BUFFER) {
    state.points = state.points.slice(-BUFFER);
  }
  state.container.innerHTML = line(state);
}, 20);

serial(state);

function stop () {
  clearInterval(interval);
  serial.stop();
}
