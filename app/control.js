const state = require('./state')();

module.exports = () =>
  '<div id=show>' +
  '<form action=#>' +
    '<button onclick="stop()">toggle</button>' +
    state.show.map((enabled, ch) =>
      `<input type=checkbox value=${ch}${enabled ? ' checked' : ''}
        onclick="state.show[${ch}] = !state.show[${ch}]">` +
        `A${ch}` +
      '</input>'
    ).join('') +
  '</form>' +
  '</div>';

