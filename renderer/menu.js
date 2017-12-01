const { remote, shell } = require('electron')

// menu template
const template = [
  {
    label: 'Items',
    submenu: [
      {
        label: 'Add new',
        accelerator: 'CmdOrCtrl+O',
        click () { $('.open-add-modal').click() }
      },
      {
        label: 'Read Item',
        accelerator: 'CmdOrCtrl+Enter',
        click () { window.openItem() }
      },
      {
        label: 'Delete Item',
        accelerator: 'CmdOrCtrl+Backspace',
        click () { window.deleteItem() }
      },
      {
        label: 'Open in Browser',
        accelerator: 'CmdOrCtrl+Shift+Enter',
        click () { window.openInBrowser() }
      },
      {
        type: 'separator'
      },
      {
        label: 'Search',
        accelerator: 'CmdOrCtrl+S',
        click () { $('#search').focus() }
      }
    ]
  },
  {
    label: 'Edit'
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Github repository',
        click () { shell.openExternal('https://github.com/gbrolo/book-list') }
      }
    ]
  }
]



const menu = remote.Menu.buildFromTemplate(template)
remote.Menu.setApplicationMenu(menu)
