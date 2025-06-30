import { BrowserWindow } from "electron";
import { deleteFromElectronStorage } from "../../shared/store.js";
import { ipcWebContentsSend } from "../../shared/utils.js";

export async function logout(window: BrowserWindow) {
  deleteFromElectronStorage("user");
  ipcWebContentsSend("auth", window.webContents, {
    isAuthenticated: false,
  });
}
