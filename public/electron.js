const electron = require('electron');
const app = electron.app;
const {  Notification, BrowserWindow, ipcMain } = electron

const path = require('path');
// const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;


const sendNotification = (data) => {
  console.log(data)
  let iconAddress = path.join(__dirname, '/icon.png');
  const notif={
    title: data.title,
    body: data.body,
    icon: iconAddress
  };
  new Notification(notif).show();

}



function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 1280, 
      height: 720, 
      minWidth: 1280, 
      minHeight: 720,
      backgroundColor: "#1A202C",
      show: false,
      webPreferences: {
        worldSafeExecuteJavaScript: true,
        nodeIntegration: true
      }
    }
  );
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.once("ready-to-show", () => mainWindow.show())
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("send-notification", (event, data) => {
  console.log(data)
  console.log(event)
  sendNotification(data);
})
