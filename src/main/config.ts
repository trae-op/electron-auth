import dotenv from "dotenv";

dotenv.config();

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
    auth: {
      googleOAuth2:
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` +
        `scope=${process.env.GOOGLE_SCOPES}&` +
        `response_type=code`,
      googleToken: "https://oauth2.googleapis.com/token",
    },
    githubReleases: `https://api.github.com/repos/${publishOptions.owner}/${publishOptions.repo}/releases`,
  },
};
