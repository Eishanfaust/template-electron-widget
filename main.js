const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // Ensure preload exists
      sandbox: true // Enable sandboxing
    },
    frame: true,
    titleBarStyle: 'default',
    resizable: true
  })

  // Configure menu properly
  const menuTemplate = process.platform === 'darwin' ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []
  
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  // Load index.html with proper path handling
  win.loadFile(path.join(__dirname, 'index.html'))
  win.webContents.openDevTools()
  // Open DevTools only in development
  if (process.env.NODE_ENV === 'development') {
  
  }
}

app.whenReady().then(createWindow)

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})