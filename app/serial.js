const SerialPort = require('serialport');
const tty = require('electron').remote.getGlobal('tty');

let port;

module.exports = (state) => {
  port = new SerialPort(tty, {
    baudRate: 9600,
    parser: SerialPort.parsers.byteDelimiter([255, 252, 255])
  });

  port.on('open', () => console.log('port open'));
  port.on('close', () => console.log('port closed'));
  port.on('error', (e) => alert(e));
  port.on('data', read);

  setTimeout(reconnect, 10 * 1000);
  function reconnect () {
    if (state.points.length === 0) {
      console.log('reconnecting');
      port.close();
      port.open();
      setTimeout(reconnect, 10 * 1000);
    }
  }

  let x = 0;
  function read (data) {
    if (data.length < 5) {
      return;
    }

    const y = data[0] * 256 + data[1];
    state.points.push([x, y]);

    x += 1;
  }
};

module.exports.stop = () => port.close();
