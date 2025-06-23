import { BrowserWindow } from "electron";
import type { TWindowManager } from "../../types/window-manager.js";

export function attachWindowEventListeners(
  browserWindow: BrowserWindow,
  windowInstance: TWindowManager
): void {
  browserWindow.webContents.on("did-finish-load", () => {
    windowInstance.onDidFinishLoad?.(browserWindow!);
  });
  browserWindow.on("hide", () => {
    windowInstance.onHide?.(browserWindow!);
  });
  browserWindow.on("show", () => {
    windowInstance.onShow?.(browserWindow!);
  });
  browserWindow.on("close", (event) => {
    windowInstance.onClose?.(event, browserWindow!);
  });
  browserWindow.webContents.on("will-redirect", (event, url) => {
    windowInstance.onWillRedirect?.(event, url, browserWindow!);
  });
}
