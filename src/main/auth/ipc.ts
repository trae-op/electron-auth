import { ipcMainOn } from "../shared/utils.js";
import { openWindow } from "./window.js";

export function registerIpc(): void {
  ipcMainOn("windowAuth", () => {
    openWindow();
  });
}
