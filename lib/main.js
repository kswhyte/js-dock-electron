const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const fs = require('fs');

var mainWindow = null;

const openFile = function () {
  var files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
    { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] }
  ]
  });

  if (!files) { return; }

  var file = files[0];
  var content = fs.readFileSync(file).toString();

  mainWindow.webContents.send('file-opened', file, content);
};

app.on('ready', function () {
  console.log('The application is ready.');

  mainWindow = new BrowserWindow();

  mainWindow.webContents.openDevTools();
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  openFile();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

exports.openFile = openFile;
exports.saveFile = saveFile;
