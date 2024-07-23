import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import { spawn } from 'child_process';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const serverProcess = spawn('node', [path.join(__dirname, '..', 'back', 'server.js')]);

  win.loadURL('http://localhost:8080/');

  win.on('closed', () => {
    serverProcess.kill();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
