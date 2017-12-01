/* Modules */
const { app, ipcMain } = require('electron')
const mainWindow = require('./mainWindow')
const readItem = require('./readItem')

//require('electron-reload')(__dirname)

// Listener for new item
ipcMain.on('new-item', (event, item) => {
  readItem(item, (it) => {
    console.log(it);
    event.sender.send('new-item-success', it)
  })
})

/* Main Electron */
app.on('ready', mainWindow.createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) mainWindow.createWindow()
})
