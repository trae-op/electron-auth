import { app, BrowserWindow, Event } from "electron";
import { WindowManager } from "../@core/decorators/window-manager.js";
import { TWindowManager } from "../@core/types/window-manager.js";
import { MenuService } from "../menu/service.js";
import { SetFeedUrlService } from "../updater/services/windows/set-feed-url.js";
import { CheckForUpdatesService } from "../updater/services/check-for-updates.js";
import { ControlUpdateWindowsPlatformService } from "../updater/services/windows/control-update.js";
import { TrayService } from "../tray/service.js";
import { destroyWindows } from "../@core/control-window/destroy.js";
import { isDev } from "../$shared/utils.js";
import { menu } from "../config.js";

@WindowManager<TWindows["main"]>({
  hash: "window:main",
  isCache: true,
  options: {
    resizable: isDev(),
    show: false,
    width: 500,
    height: 500,
  },
})
export class AppWindow implements TWindowManager {
  private isWillClose = false;

  constructor(
    private menuService: MenuService,
    private trayService: TrayService,
    private setFeedUrlService: SetFeedUrlService,
    private checkForUpdatesService: CheckForUpdatesService,
    private controlUpdateWindowsPlatformService: ControlUpdateWindowsPlatformService
  ) {
    this.setFeedUrlService.setFeedURL();
    this.controlUpdateWindowsPlatformService.controlUpdate();

    app.on("before-quit", () => {
      this.isWillClose = true;

      this.trayService.destroyTray();
      destroyWindows();
    });
  }

  onDidFinishLoad(window: BrowserWindow): void {
    this.buildMenu(window);
    this.checkForUpdatesService.checkForUpdates();
  }

  private buildMenu(window: BrowserWindow): void {
    this.menuService.buildMenu(
      this.menuService.menu.map((item) => {
        if (item.name === "app") {
          item.submenu = [
            {
              label: menu.labels.devTools,
              click: () => window.webContents.openDevTools(),
            },
            {
              label: menu.labels.quit,
              click: () => app.quit(),
            },
          ];
        }

        return item;
      })
    );
  }

  onShow(): void {
    this.isWillClose = false;
  }

  onClose(event: Event, window: BrowserWindow): void {
    if (this.isWillClose) {
      return;
    }

    event.preventDefault();
    window.hide();
    if (app.dock) {
      app.dock.hide();
    }
  }
}
