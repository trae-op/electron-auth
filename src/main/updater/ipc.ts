import { app, BrowserWindow } from "electron";
import pkg from "electron-updater";
import { destroyWindows } from "../@core/control-window/destroy.js";
import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import type {
  TIpcHandlerInterface,
  TParamOnInit,
} from "../@core/types/ipc-handler.js";
import { ipcMainOn } from "../$shared/utils.js";
import { TrayService } from "../tray/service.js";
import { OpenLatestVersionService } from "./services/mac-os/open-latest-version.js";

const { autoUpdater } = pkg;

@IpcHandler()
export class UpdaterIpc implements TIpcHandlerInterface {
  private updateAppWindow: BrowserWindow | undefined = undefined;

  constructor(
    private trayService: TrayService,
    private openLatestVersionService: OpenLatestVersionService
  ) {}

  onInit({ getWindow }: TParamOnInit<TWindows["updateApp"]>) {
    const updateAppWindow = getWindow("window:update-app");

    this.trayService.buildTray(
      this.trayService.trayMenu.map((item) => {
        if (item.name === "check-update") {
          item.click = async () => {
            if (this.updateAppWindow) {
              this.updateAppWindow.show();
            } else {
              this.updateAppWindow = await updateAppWindow.create();
            }
          };
        }

        return item;
      })
    );

    ipcMainOn("restart", () => {
      autoUpdater.quitAndInstall();
    });

    ipcMainOn("openLatestVersion", (_, { updateFile }) => {
      this.openLatestVersionService.openLatestVersion(updateFile);
      this.trayService.destroyTray();
      destroyWindows();
      app.quit();
    });
  }
}
