const electron = require('electron');
const path = require('path');
const { on } = require('process');
const url = require('url');
// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let control;
let scoreboard;


app.on('ready', function(){

  control = new BrowserWindow({
    title:'Control panel',
    webPreferences: {
      nodeIntegration: true
    }
  });
  // 
  control.loadFile('html/control.html');
  control.on('closed', function(){
    app.quit();
  });
  // 

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

//
function createScoreboard(){
  scoreboard = new BrowserWindow({
    resizable: false,
    fullscreen: true,
    frame: false,
    title:'scoreboard',
    webPreferences: {
        nodeIntegration: true
    }
  });
  scoreboard.loadFile('html/scoreboard.html');

  scoreboard.on('close', function(){
    scoreboard = null;
  });
  scoreboard.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape' ) {
      scoreboard.close();
    }
  });
}

// 

ipcMain.on('set-time', function(e, minutes, seconds){
  scoreboard.webContents.send('set-time', minutes, seconds);
});

ipcMain.on('start', () => {
  scoreboard.webContents.send('start');
});

ipcMain.on('stop', () => {
  scoreboard.webContents.send('stop');
});

ipcMain.on('reset-time', () => {
  scoreboard.webContents.send('reset-time');
});

ipcMain.on('change-time', function(e, add) {
  scoreboard.webContents.send('change-time', add);
});

ipcMain.on('score', function(e, akaPoint, aoPoint) {
  scoreboard.webContents.send('score', akaPoint, aoPoint);
});

ipcMain.on('warnings', function(e, value) {
  scoreboard.webContents.send('warnings', value);
});

ipcMain.on('reset', () => {
  scoreboard.webContents.send('reset');
});

ipcMain.on('create', () =>{
  createScoreboard();
});

ipcMain.on('close', () =>{
  scoreboard.close();
});

ipcMain.on('win', function(e, value) {
  scoreboard.webContents.send('win', value);
});


// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label:'Add scoreboard',
        click(){
          createScoreboard();
        }
      },
      {
        label:'Clear Items',
        click(){
          control.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}