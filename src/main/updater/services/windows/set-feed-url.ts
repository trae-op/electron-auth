import pkg from "electron-updater";
import { isDev, isPlatform } from "../../../$shared/utils.js";
import { Injectable } from "../../../@core/decorators/injectable.js";
import { publishOptions } from "../../../config.js";

const { autoUpdater } = pkg;

@Injectable()
export class SetFeedUrlService {
  constructor() {}

  setFeedURL() {
    if (isPlatform("win32") && !isDev()) {
      autoUpdater.disableDifferentialDownload = true;
      autoUpdater.setFeedURL({
        provider: "github",
        repo: publishOptions.repo,
        owner: publishOptions.owner,
        private: true,
        token: process.env.GH_TOKEN,
      });
    }
  }
}
