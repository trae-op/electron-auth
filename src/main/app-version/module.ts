import { RgModule } from "../@core/decorators/rg-module.js";
import { AppVersionIpc } from "./ipc.js";

@RgModule({
  ipc: [AppVersionIpc],
})
export class AppVersionModule {}
