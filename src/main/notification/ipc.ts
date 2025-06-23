import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import type { TIpcHandlerInterface } from "../@core/types/ipc-handler.js";
import { NotificationService } from "./service.js";

@IpcHandler()
export class NotificationIpc implements TIpcHandlerInterface {
  constructor(private notificationService: NotificationService) {}

  onInit() {
    this.notificationService.initNotification();
  }
}
