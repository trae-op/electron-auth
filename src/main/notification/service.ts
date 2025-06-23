import { Notification, type NotificationConstructorOptions } from "electron";
import path from "node:path";
import { Injectable } from "../@core/decorators/injectable.js";
import { icons } from "../config.js";
import { getAssetsPath } from "../$shared/pathResolver.js";

let notification: Notification | undefined = undefined;

@Injectable()
export class NotificationService {
  constructor() {}

  initNotification(): void {
    notification = new Notification({
      icon: path.join(getAssetsPath(), icons.notificationIcon),
    });
  }

  setNotification(
    options: Partial<NotificationConstructorOptions>
  ): Notification | undefined {
    if (notification !== undefined) {
      notification = Object.assign(notification, options);
    }

    return notification;
  }
}
