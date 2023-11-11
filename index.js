const { app, BrowserWindow } = require('electron');

// access argv from browser window
global.tty = process.argv[2];
if (!global.tty) {
  console.log('You must supply the tty to your Arduino.');
  console.log('Usage:');
  console.log('\n    npm start -- /path/to/tty\n\n');
  process.exit(1);
}

// avoid window garbage collection
let win, settings;
function createWindows () {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(`file://${__dirname}/app/index.html`);

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  settings = new BrowserWindow({width: 400, height: 400, parent: win});
  settings.loadURL(`file://${__dirname}/app/settings.html`);
}

app.on('ready', createWindows);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// OS X event, dock icon clicked
app.on('activate', () => {
  if (win === null) {
    createWindows();
  }
});
