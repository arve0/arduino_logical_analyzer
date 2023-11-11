const state = require('./state')();

const COLORS = ['red', 'blue', 'green', 'white'];

module.exports = (channel) => {
  if (!state.show[channel]) {
    return '';
  }
  let length = state.measurements[channel].length;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
        width="${length}" height="${state.size.y}">
      <g transform="translate(0,${state.size.y})">
        ${path(channel)}
      </g>
    </svg>`.trim();
};

function path (channel) {
  return `<path d="${line(state.measurements[channel])}" fill="transparent" stroke="${COLORS[channel]}" stroke-width="3" />`;
}

function line (points) {
  let maxSize = state.size;
  if (points.length < 1) {
    return '';
  } else if (points.length === 1) {
    return 'M' + points[0];
  }
  //  else if (points.length > maxSize.x) {
  //   return line(points.slice(-maxSize.x), maxSize);
  // }

  const start = points[0][0];
  // shift to x = 0, scale y
  let shiftedPoints = points.map(p => {
    let x = p[0] - start;
    // reverse y coordinate - we are inside translate(0, maxSize.y)
    let y = - p[1] / 1023 * maxSize.y;
    return [x, y];
  });

  return 'M' + shiftedPoints[0] +  // move to: Mx,y
    'L' + shiftedPoints.slice(1).join(' ');  // line to: Lx1,y1 x2,y2 ...
}
