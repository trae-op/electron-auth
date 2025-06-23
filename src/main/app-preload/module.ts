import { RgModule } from "../@core/decorators/rg-module.js";
import { AppPreloadIpc } from "./ipc.js";
import { AppPreloadWindow } from "./window.js";

@RgModule({
  ipc: [AppPreloadIpc],
  windows: [AppPreloadWindow],
})
export class AppPreloadModule {}
