import { dialog } from "electron";
import pkg from "electron-updater";
import { Injectable } from "../../../@core/decorators/injectable.js";
import { messages } from "../../../config.js";
import { SendUpdateInfoService } from "../send-update-info.js";
import { NotificationService } from "../../../notification/service.js";
import { setStore } from "../../../$shared/store.js";
import { isDev, isPlatform } from "../../../$shared/utils.js";

const { autoUpdater } = pkg;

@Injectable()
export class ControlUpdateWindowsPlatformService {
  constructor(
    private sendUpdateInfoService: SendUpdateInfoService,
    private notificationService: NotificationService
  ) {}

  controlUpdate() {
    if (isPlatform("win32") && !isDev()) {
      autoUpdater.on("checking-for-update", () => {
        setStore("updateProcess", true);
        this.sendUpdateInfoService.sendUpdateInfo({
          message: messages.autoUpdater.checkingForUpdate,
          status: "checking-for-update",
          platform: process.platform,
        });
      });

      autoUpdater.on("update-not-available", () => {
        setStore("updateProcess", false);
        this.sendUpdateInfoService.sendUpdateInfo({
          message: messages.autoUpdater.updateNotAvailable,
          status: "update-not-available",
          platform: process.platform,
        });
      });

      autoUpdater.on("update-available", (info) => {
        this.sendUpdateInfoService.sendUpdateInfo({
          message: messages.autoUpdater.updateAvailable,
          status: "update-available",
          version: info.version,
          platform: process.platform,
        });
      });

      autoUpdater.on("download-progress", (progress) => {
        this.sendUpdateInfoService.sendUpdateInfo({
          downloadedPercent: progress.percent.toFixed(2),
          status: "download-progress",
          platform: process.platform,
        });
      });

      autoUpdater.on("update-downloaded", (info: pkg.UpdateDownloadedEvent) => {
        setStore("updateProcess", false);
        this.sendUpdateInfoService.sendUpdateInfo({
          message: messages.autoUpdater.updateDownloaded,
          status: "update-downloaded",
          version: info.version,
          platform: process.platform,
        });

        this.notificationService
          .setNotification({
            title: messages.autoUpdater.notificationTitle,
            body: messages.autoUpdater.notificationBody,
          })
          ?.show();
      });

      autoUpdater.on("error", (error) => {
        setStore("updateProcess", false);

        dialog.showMessageBox({
          title: messages.autoUpdater.error,
          message: error.message,
        });
      });
    }
  }
}
