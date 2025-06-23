import dotenv from "dotenv";
import path from "node:path";
import { isDev } from "./$shared/utils.js";

const envPath = path.join(process.resourcesPath, ".env");
dotenv.config(!isDev() ? { path: envPath } : undefined);

export const windows: TWindows = {
  main: "window:main",
  preloadApp: "window:preload-app",
  updateApp: "window:update-app",
};

export const folders = {
  distRenderer: "dist-renderer",
  distMain: "dist-main",
  download: "app-update",
};

export const menu = {
  labels: {
    app: "App",
    checkUpdate: "Check for updates...",
    showApp: "Show",
    quit: "Quit",
    devTools: "Developer tools",
  },
};

export const icons = {
  trayIconTemplate: "16x16.png",
  trayIcon: "16x16.png",
  notificationIcon: "72x72.png",
};

export const messages = {
  autoUpdater: {
    checkingForUpdate: "Checking for update...",
    updateNotAvailable: "Update not available",
    updateAvailable: "Update available",
    updateDownloaded: "Update downloaded",
    notificationTitle: "New updates",
    notificationBody: "Your app has new updates!",
    error: "Something wrong!",
    errorCreatingFolder: "Unknown error creating folder",
    errorOpenFolder: "Failed to open folder",
    errorVerifyDownload: "File does not exist",
  },
  crash: {
    uncaughtException: "Uncaught synchronous error in main process!",
    unhandledRejection: "Unhandled Promise failure in main process!",
    renderProcessGone: "The renderer process terminated unexpectedly!",
  },
};

export const publishOptions = {
  repo: "electron-auth",
  owner: "trae-op",
};

export const restApi = {
  urls: {
    githubReleases: `https://api.github.com/repos/${publishOptions.owner}/${publishOptions.repo}/releases`,
  },
};
