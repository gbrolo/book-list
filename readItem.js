// Modules
const { BrowserWindow } = require('electron')

// Thumbnail
let itemWindowBG

module.exports = (url, callback) => {
  itemWindowBG = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: false,
    webPreferences: {
      offscreen: true
    }
  })

  itemWindowBG.loadURL(url)
  itemWindowBG.webContents.on('did-finish-load', () => {
    // screenshot for Thumbnail
    console.log('BEFORE')
    itemWindowBG.webContents.capturePage((image) => {
      let screenshot = image.toDataURL()
      console.log('screenshot', screenshot)
      let title = itemWindowBG.getTitle()
      callback({ title, screenshot, url })
      itemWindowBG.close()
      itemWindowBG = null
    })
  })
}
