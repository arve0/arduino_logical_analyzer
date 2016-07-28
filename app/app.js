var SerialPort = require('serialport');

const port = new SerialPort('/dev/tty.usbserial-A900LEL7', {
  baudRate: 9600,
  parser: SerialPort.parsers.byteDelimiter([255, 252, 255])
});

port.on('open', () => console.log('port open'));
port.on('close', () => console.log('port closed'));
port.on('error', (e) => console.error(e));

var x = 0;
port.on('data', read);

var dot = document.querySelector('#dot');
function read (data) {
  if (data.length < 5) {
    return;
  }

  var value = data[0] * 256 + data[1];
  var y = (99 - value / 1023 * 99) + '%';

  dot.style.left = x + '%';
  dot.style.top = y;

  x = x < 100 ? x + 0.1 : 0;
}

