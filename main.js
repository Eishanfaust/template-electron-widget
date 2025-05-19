const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    frame: true,
    titleBarStyle: 'default',
    resizable: true
  })

  // Remove menu bar for all platforms
  Menu.setApplicationMenu(null)

  // Special handling for macOS
  if (process.platform === 'darwin') {
    const template = []
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)