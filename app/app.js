const plot = require('./plot');
const lines = require('./lines');
const serial = require('./serial');

const BUFFER = 2048;

// TODO: move to own file, use getState() instead of passing as argument
const state = {  // global state
  size: getSize(),
  points: [],
  container: document.getElementById('container')
};

window.onresize = () => state.size = getSize();
function getSize () {
  // 10 px margin top
  return { x: window.innerWidth, y: window.innerHeight - 20 };
}

let interval = setInterval(() => {
  if (state.points.length > BUFFER) {
    state.points = state.points.slice(-BUFFER);
  }
  state.container.innerHTML = plot(state) + lines(state);
}, 20);

serial(state);

function stop () {
  clearInterval(interval);
  serial.stop();
}
