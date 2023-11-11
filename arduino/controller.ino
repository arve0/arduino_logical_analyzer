// Constants
// Motor load
int LOAD_PIN = 0;  // which pin to read motor load
int LOAD_MEASUREMENTS = 256;
int LOAD[LOAD_MEASUREMENTS];
int LOAD_LIMIT = 42000;

int loadReadLocation = 0;

void setup () {
  resetLoad();
  Serial.begin(9600);
  help();
}

void loop () {
  readLoad();
  switch (Serial.read()) {
    case 'h':
      help();
      break;
    case 'u':
      // TODO
      break;
    case 'd':
      // TODO
      break;
  }
}

void help () {
  Serial.println("--- COMMANDS ---");
  Serial.println("h : Help, this menu.");
  Serial.println("u : Up, drive garage door up.");
  Serial.println("d : Down, drive garage door down.");
}

void resetLoad() {
  for (int i = 0; i < LOAD_MEASUREMENTS; i += 1) {
    LOAD[i] = 0;
  }
}

void readLoad () {
  LOAD[loadReadLocation] = analogRead();
  loadReadLocation += 1;
  if (loadReadLocation == LOAD_MEASUREMENTS) {
    loadReadLocation = 0;
  }
}

bool loadTooHigh () {
  int itegral = 0;
  for (int i = 0; i < LOAD_MEASUREMENTS; i += 1) {
    itegral += LOAD[i];
  }
  if (integral > LOAD_LIMIT) {
    return true;
  }
  return false;
}
