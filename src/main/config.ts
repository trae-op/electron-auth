export const windows: TWindows = {
  main: "window:main",
  updateApp: "window:update-app",
  preloadApp: "window:preload-app",
  auth: "window:auth",
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
  trayIconTemplate: "trayIconTemplate.png",
  trayIcon: "trayIcon.png",
  notificationIcon: "react-72x72.png",
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
};

export const publishOptions = {
  repo: "electron-auth",
  owner: "trae-op",
};

export const restApi = {
  urls: {
    googleToken: "https://oauth2.googleapis.com/token",
    githubReleases: `https://api.github.com/repos/${publishOptions.owner}/${publishOptions.repo}/releases`,
  },
};
