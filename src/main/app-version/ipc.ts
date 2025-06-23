import { app } from "electron";
import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import type { TIpcHandlerInterface } from "../@core/types/ipc-handler.js";
import { ipcMainHandle } from "../$shared/utils.js";

@IpcHandler()
export class AppVersionIpc implements TIpcHandlerInterface {
  constructor() {}

  onInit() {
    const currentVersion = app.getVersion();
    ipcMainHandle("getVersion", () => currentVersion);
  }
}
