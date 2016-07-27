const SerialPort = require('serialport');

const port = new SerialPort('/dev/tty.usbserial-A900LEL7', {
  baudRate: 115200,
  parser: SerialPort.parsers.byteDelimiter([255, 252, 255])
});

port.on('data', (data) => {
  var value = data[0] * 256 + data[1];
  console.log(value);
});

process.on('SIGINT', () => {
  port.close(() => {
    process.exit(0);
  });
});
