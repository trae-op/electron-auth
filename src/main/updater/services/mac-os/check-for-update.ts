import { app, dialog } from "electron";
import path from "node:path";
import { compareVersions } from "compare-versions";
import { Injectable } from "../../../@core/decorators/injectable.js";
import { TOptionsUpdater } from "./types.js";
import { folders, messages, restApi } from "../../../config.js";
import { VerifyService } from "./verify.js";
import { DownloadFileService } from "./download-file.js";

@Injectable()
export class CheckForUpdateService {
  constructor(
    private downloadFileService: DownloadFileService,
    private verifyService: VerifyService
  ) {}

  async checkForUpdate({ eventCallBack }: TOptionsUpdater): Promise<any> {
    try {
      eventCallBack({
        status: "checking-for-update",
      });

      const downloadsPath = app.getPath("downloads");
      const folderPath = path.join(downloadsPath, folders.download);

      const response = await fetch(`${restApi.urls.githubReleases}/latest`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.GH_TOKEN}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();

      if (data.tag_name) {
        const latestVersion = data.tag_name.replace(/^v/, "");
        const currentVersion = app.getVersion();

        if (compareVersions(latestVersion, currentVersion) === 1) {
          const updateFile = data.assets.find((asset: { name: string }) =>
            asset.name.endsWith(".dmg")
          );

          if (updateFile !== null && updateFile.browser_download_url) {
            const verify = await this.verifyService.isVerify(
              folderPath,
              updateFile.name
            );

            if (verify) {
              eventCallBack({
                version: latestVersion,
                status: "update-downloaded",
                updateFile: updateFile.name,
              });

              return undefined;
            }

            eventCallBack({
              version: latestVersion,
              status: "update-available",
            });
            this.downloadFileService
              .downloadFile({
                name: updateFile.name,
                assetId: updateFile.id,
                size: updateFile.size,
                onDownloadProgress: (percent) => {
                  eventCallBack({
                    status: "download-progress",
                    downloadedPercent: String(percent),
                  });
                },
              })
              .then((status) => {
                eventCallBack({
                  status,
                  version: latestVersion,
                  updateFile: updateFile.name,
                });
              })
              .catch((error) => {
                if (error instanceof Error) {
                  eventCallBack({
                    status: "error",
                  });
                  dialog.showMessageBox({
                    title: messages.autoUpdater.error,
                    message: error.message,
                  });
                }
              });
          }
        } else {
          eventCallBack({
            status: "update-not-available",
          });

          return null;
        }
      } else {
        eventCallBack({
          status: "update-not-available",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        eventCallBack({
          status: "error",
        });

        dialog.showMessageBox({
          title: messages.autoUpdater.error,
          message: error.message,
        });
      }
    }
  }
}
