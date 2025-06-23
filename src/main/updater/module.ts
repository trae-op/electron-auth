import { RgModule } from "../@core/decorators/rg-module.js";
import { CheckForUpdateService } from "./services/mac-os/check-for-update.js";
import { VerifyService } from "./services/mac-os/verify.js";
import { CreateLatestVersionFolderService } from "./services/mac-os/create-latest-version-folder.js";
import { DownloadFileService } from "./services/mac-os/download-file.js";
import { ControlUpdateService } from "./services/mac-os/control-update.js";
import { ControlUpdateWindowsPlatformService } from "./services/windows/control-update.js";
import { SendUpdateInfoService } from "./services/send-update-info.js";
import { CheckUpdateProcessService } from "./services/check-update-process.js";
import { CheckForUpdatesService } from "./services/check-for-updates.js";
import { SetFeedUrlService } from "./services/windows/set-feed-url.js";
import { OpenLatestVersionService } from "./services/mac-os/open-latest-version.js";
import { UpdaterIpc } from "./ipc.js";
import { TrayModule } from "../tray/module.js";
import { NotificationModule } from "../notification/module.js";
import { UpdaterWindow } from "./window.js";

@RgModule({
  imports: [TrayModule, NotificationModule],
  ipc: [UpdaterIpc],
  windows: [UpdaterWindow],
  providers: [
    CheckForUpdateService,
    VerifyService,
    SetFeedUrlService,
    CreateLatestVersionFolderService,
    DownloadFileService,
    ControlUpdateService,
    SendUpdateInfoService,
    CheckUpdateProcessService,
    CheckForUpdatesService,
    OpenLatestVersionService,
    ControlUpdateWindowsPlatformService,
  ],
  exports: [
    CheckForUpdatesService,
    ControlUpdateWindowsPlatformService,
    SetFeedUrlService,
    OpenLatestVersionService,
  ],
})
export class UpdaterModule {}
