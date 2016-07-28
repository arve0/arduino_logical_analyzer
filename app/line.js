
module.exports = (state) => `
  <svg width="${state.size.x}" height="${state.size.y - 10}">
    ${path(state)}
  </svg>
`.trim();

function path (state) {
  return `<path d="${line(state.points, state.size)}" fill="transparent" stroke="black" stroke-width="3" />`;
}

function line (points, maxSize) {
  if (points.length < 1) {
    return '';
  } else if (points.length === 1) {
    return 'M' + points[0];
  } else if (points.length > maxSize.x) {
    return line(points.slice(-maxSize.x), maxSize);
  }

  const start = points[0][0];
  const ySize = maxSize.y - 10;  // 5px margin top and bottom
  // shift to x = 0, scale y
  let shiftedPoints = points.map(p => {
    let x = p[0] - start;
    // reverse y coordinate
    let y = ySize - (p[1] / 1023) * ySize;
    return [x, y];
  });

  return 'M' + shiftedPoints[0] +  // move to: Mx,y
    'L' + shiftedPoints.slice(1).join(' ');  // line to: Lx1,y1 x2,y2 ...
}

function circles (points) {
  return points.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3" />`);
}
