int CHANNELS = 4;

int ch;

void setup () {
  Serial.begin(115200);
  // 115200 = 12 800 bytes per second (1 byte = 8 data + stop bit = 9 bits)
  // => 78 us per byte
  // time = 2*78*channels + 78 (new line)
  // 4 channels => 702 us per read
  // read time = 100 us per channel
  // => ~300 us idle each flush (optimistic)
  pinMode(13, OUTPUT);
  blink(10);
}

void loop () {
  if (Serial.availableForWrite() < 2 * CHANNELS + 3) {
    blink(20);
    return;
  }
  for (ch = 0; ch < CHANNELS; ch += 1) {
    readChannel(ch);
  }
  // clear serial buffer
  stopBytes();
  Serial.flush();
}

void readChannel (int channel) {
  int val = analogRead(channel);
  char out1 = val / 256;
  Serial.write(out1);
  char out2 = val - 256 * out1;
  Serial.write(out2);
}

void stopBytes () {
  Serial.write(255);
  Serial.write(252);
  Serial.write(255);
}

void blink (int times) {
  int i;
  for (i = 0; i < times; i += 1) {
    digitalWrite(13, HIGH);
    delay(100);
    digitalWrite(13, LOW);
    delay(100);
  }
}

