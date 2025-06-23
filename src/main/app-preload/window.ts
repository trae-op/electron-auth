import { app } from "electron";
import path from "node:path";
import { WindowManager } from "../@core/decorators/window-manager.js";
import { TWindowManager } from "../@core/types/window-manager.js";
import { isDev } from "../$shared/utils.js";

@WindowManager<TWindows["preloadApp"]>({
  hash: "window:preload-app",
  isCache: true,
  options: {
    backgroundColor: "#444",
    width: 300,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
  },
  loadURL: `file://${path.join(
    app.getAppPath(),
    isDev()
      ? "./src/main/app-preload/spinner.html"
      : "../dist-main/spinner.html"
  )}`,
})
export class AppPreloadWindow implements TWindowManager {
  constructor() {}
}
