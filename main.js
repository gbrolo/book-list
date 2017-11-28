/* Modules */
const { app, ipcMain } = require('electron')
const mainWindow = require('./mainWindow')

require('electron-reload')(__dirname)

// Listener for new item
ipcMain.on('new-item', (event, item) => {
  setTimeout(() => {
    event.sender.send('new-item-success', 'new read item')
  }, 2000)
})

/* Main Electron */
app.on('ready', mainWindow.createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) mainWindow.createWindow()
})
