import { Injectable } from "../../../@core/decorators/injectable.js";
import { messages } from "../../../config.js";
import { CheckForUpdateService } from "./check-for-update.js";
import { SendUpdateInfoService } from "../send-update-info.js";
import { setStore } from "../../../$shared/store.js";
import { NotificationService } from "../../../notification/service.js";

@Injectable()
export class ControlUpdateService {
  constructor(
    private checkForUpdateService: CheckForUpdateService,
    private sendUpdateInfoService: SendUpdateInfoService,
    private notificationService: NotificationService
  ) {}

  controlUpdate() {
    this.checkForUpdateService.checkForUpdate({
      eventCallBack: ({ status, version, downloadedPercent, updateFile }) => {
        switch (status) {
          case "checking-for-update": {
            setStore("updateProcess", true);
            this.sendUpdateInfoService.sendUpdateInfo({
              message: messages.autoUpdater.checkingForUpdate,
              status,
              platform: process.platform,
            });
            break;
          }

          case "update-not-available": {
            setStore("updateProcess", false);
            this.sendUpdateInfoService.sendUpdateInfo({
              message: messages.autoUpdater.updateNotAvailable,
              status,
              platform: process.platform,
            });
            break;
          }

          case "update-available": {
            this.sendUpdateInfoService.sendUpdateInfo({
              message: messages.autoUpdater.updateAvailable,
              status,
              version,
              platform: process.platform,
            });
            break;
          }

          case "download-progress": {
            this.sendUpdateInfoService.sendUpdateInfo({
              downloadedPercent,
              status,
              platform: process.platform,
            });
            break;
          }

          case "update-downloaded": {
            setStore("updateProcess", false);
            this.sendUpdateInfoService.sendUpdateInfo({
              message: messages.autoUpdater.updateDownloaded,
              status,
              version,
              platform: process.platform,
              updateFile,
            });

            this.notificationService
              .setNotification({
                title: messages.autoUpdater.notificationTitle,
                body: messages.autoUpdater.notificationBody,
              })
              ?.show();
            break;
          }

          case "error": {
            setStore("updateProcess", false);
            break;
          }
          default:
            return;
        }
      },
    });
  }
}
