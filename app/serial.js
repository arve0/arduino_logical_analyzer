const SerialPort = require('serialport');
// TODO: SerialPort.list((err, ports) => ...)
const tty = require('electron').remote.getGlobal('tty');

const state = require('./state')();

// 1200, 2400, 4800, 9600, 18200, 36400, 115200
let BAUD = 115200;

let port;


module.exports = () => {
  port = new SerialPort(tty, {
    baudRate: BAUD,
    parser: byteDelimiter([255, 252, 255])
  });
  module.exports.port = port;

  port.on('open', () => console.log('port open'));
  port.on('close', () => console.log('port closed'));
  port.on('error', (e) => alert(e));
  port.on('data', read);

  // setTimeout(reconnect, 10 * 1000);
  // function reconnect () {
  //   if (state.points.length === 0) {
  //     console.log('reconnecting');
  //     port.close();
  //     port.open();
  //     setTimeout(reconnect, 10 * 1000);
  //   }
  // }

  let x = 0;
  let ready = true;
  function read (data) {
    if (!ready || data.length < state.channels * 2 + 3) {
      return;
    }
    // start sequence
    const l = data.length;
    if (data[l - 3] !== 255 || data[l - 2] !== 252 || data[l - 1] !== 255) {
      console.log(data);
      console.log('draining');
      ready = false;
      port.drain(() => {
        console.log('done draining');
        ready = true;
      });
      return;
    }

    for (let ch = 0; ch < state.channels; ch += 1) {
      const y = data[ch * 2] * 256 + data[1 + ch * 2];
      state.measurements[ch].push([x, y]);
    }

    x += 1;
  }
};

module.exports.stop = () => port.close();
module.exports.toggle = () => port.paused ? port.resume() : port.pause();

function byteDelimiter (delimiter) {
  if (!Array.isArray(delimiter)) {
    delimiter = [ delimiter ];
  }
  let buf = [];
  return function(emitter, buffer) {
    for (let i = 0; i < buffer.length; i++) {
      buf[buf.length] = buffer[i];
      if (isEqual(delimiter, buf.slice(-delimiter.length))) {
        emitter.emit('data', buf);
        buf = [];
      }
    }
  };
}

function isEqual (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let l = arr1.length;
  for (let i = 0; i < l; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
