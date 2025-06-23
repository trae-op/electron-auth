import { app, dialog } from "electron";
import { ipcMainOn } from "../$shared/utils.js";
import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import { getWindow as getWindows } from "../@core/control-window/receive.js";
import type {
  TIpcHandlerInterface,
  TParamOnInit,
} from "../@core/types/ipc-handler.js";
import { AppService } from "./service.js";
import { messages } from "../config.js";
import type { TDestroyProcess } from "./types.js";

@IpcHandler()
export class AppIpc implements TIpcHandlerInterface {
  constructor(private appService: AppService) {
    process.on("uncaughtException", (error) => {
      this.destroyProcess({
        error,
        message: error.message,
        title: messages.crash.uncaughtException,
      });
    });

    process.on("unhandledRejection", (reason) => {
      this.destroyProcess({
        error: reason,
        message: messages.crash.unhandledRejection,
        title: messages.crash.unhandledRejection,
      });
    });

    app.on("render-process-gone", (_event, _webContents, details) => {
      this.destroyProcess({
        error: details,
        message: `Exit Code: ${details.exitCode}, Reason: ${details.reason}`,
        title: messages.crash.renderProcessGone,
      });
    });
  }

  private destroyProcess({ error, message, title }: TDestroyProcess) {
    if (error !== undefined) {
      console.error(error);
    }

    this.appService.destroyTrayAndWindows();
    this.appService.dockHide();

    dialog.showMessageBox({
      title,
      message,
    });
  }

  async onInit({ getWindow }: TParamOnInit<TWindows["main"]>) {
    const mainWindow = getWindow("window:main");
    const window = await mainWindow.create();

    ipcMainOn("closePreloadWindow", async () => {
      const preloadAppWindow =
        getWindows<TWindows["preloadApp"]>("window:preload-app");
      if (preloadAppWindow !== undefined) {
        preloadAppWindow.hide();
      }

      if (window !== undefined) {
        window.show();
      }
    });
  }
}
