module.exports = (baud) => `

int CHANNELS = 2;

int ch;

void setup () {
  Serial.begin(${baud});
  // 115200 = 12 800 bytes per second (1 byte = 8 data + stop bit = 9 bits)
  // => 78 us per byte
  // time = 2*78*channels + 78 (new line)
  // 4 channels => 702 us per read
  // read time = 100 us per channel
  // => ~300 us idle each flush (optimistic)
}

void loop () {
  startBytes();
  for (ch = 0; ch < CHANNELS; ch += 1) {
    readChannel(ch);
  }
  // clear serial buffer
  Serial.flush();
  delay(1);
}

void readChannel (int channel) {
  int val = analogRead(channel);
  char out1 = val / 256;
  Serial.write(out1);
  char out2 = val - 256 * out1;
  Serial.write(out2);
}

void startBytes () {
  Serial.write(255);
  Serial.write(255);
  Serial.write(255);
}
`.trim();
