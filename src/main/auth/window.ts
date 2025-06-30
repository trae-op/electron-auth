import { BrowserWindow, session } from "electron";
import { createWindow } from "../shared/control-window/create.js";
import { restApi } from "../config.js";

export function openWindow(provider: TProviders): BrowserWindow {
  const authSession = session.fromPartition("persist:auth");
  let loadURL = "";

  if (provider === "google") {
    loadURL = restApi.urls.auth.googleOAuth2;
  }

  return createWindow<TWindows["auth"]>({
    hash: "window:auth",
    loadURL,
    options: {
      autoHideMenuBar: true,
      minimizable: false,
      maximizable: false,
      title: "",
      width: 400,
      height: 400,
      webPreferences: {
        session: authSession,
      },
    },
  });
}
