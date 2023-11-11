
module.exports = (state) => {
  let lines = '';

  for (let i = 0; i < 6; i += 1) {
    let bottom = state.size.y * i / 5;  // distance from bottom
    lines += `<span class="voltageLine" style="bottom: ${bottom}px">${i} V</span>`;
  }

  return lines;
};
