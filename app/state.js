// global state
const state = {
  bufferSize: 8192,
  size: getSize(),
  channels: 4,
  measurements: [],
  container: document.getElementById('container'),
  show: []
};

let initialized = false;
if (!initialized) {
  initialized = true;
  for (let ch = 0; ch < state.channels; ch += 1) {
    state.measurements.push([]);
    state.show.push(true);
    console.log('state initialized');
  }
}

// setInterval(() => {
//   if (state.points.length > state.bufferSize) {
//     state.points = state.points.slice(-state.bufferSize);
//   }
// }, 500);

function getSize () {
  // 10 px margin top
  return { x: window.innerWidth, y: window.innerHeight - 20 };
}

window.onresize = () => state.size = getSize();

/**
 * Get state.
 *
 * @returns {object} global state
 */
module.exports = () => state;
