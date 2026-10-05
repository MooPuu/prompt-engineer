/* =============================================================
   Prompt Engineer — Electron main process
   © Mahdi Kareem
   ============================================================= */
const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

const APP_NAME = 'Prompt Engineer — مهندس البرومبت';

/* منع نسخ متعددة (Installer / Portable) */
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1360,
    height: 900,
    minWidth: 940,
    minHeight: 620,
    show: false,
    backgroundColor: '#0b0f1a',
    title: APP_NAME,
    icon: path.join(__dirname, 'prompt engineer icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      devTools: true
    }
  });

  Menu.setApplicationMenu(null);

  win.loadFile(path.join(__dirname, 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
    win.focus();
  });

  /* روابط الموقع الخارجي تُفتح في المتصفح الافتراضي */
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'ignore' };
  });

  win.webContents.on('will-navigate', (e, url) => {
    if (/^https?:/i.test(url)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  return win;
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.mahdikareem.promptengineer');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('second-instance', () => {
  const wins = BrowserWindow.getAllWindows();
  if (wins.length) {
    if (wins[0].isMinimized()) wins[0].restore();
    wins[0].focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
