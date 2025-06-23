import { app } from "electron";
import { Injectable } from "../@core/decorators/injectable.js";
import { TrayService } from "../tray/service.js";
import { getWindow } from "../@core/control-window/receive.js";

@Injectable()
export class AppService {
  constructor(private trayService: TrayService) {}

  destroyTrayAndWindows(): void {
    this.trayService.destroyTray();
    const preloadAppWindow =
      getWindow<TWindows["preloadApp"]>("window:preload-app");

    if (preloadAppWindow !== undefined) {
      preloadAppWindow.destroy();
    }
  }

  dockHide() {
    if (app.dock) {
      app.dock.hide();
    }
  }
}
