import { RgModule } from "../@core/decorators/rg-module.js";
import { NotificationIpc } from "./ipc.js";
import { NotificationService } from "./service.js";

@RgModule({
  ipc: [NotificationIpc],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
