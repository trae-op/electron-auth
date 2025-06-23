import { app, Menu } from "electron";
import dotenv from "dotenv";
import path from "node:path";
import { isDev } from "./$shared/utils.js";
import { AppModule } from "./app/module.js";
import { bootstrapModules } from "./@core/bootstrap/bootstrap.js";
import { UpdaterModule } from "./updater/module.js";
import { AppPreloadModule } from "./app-preload/module.js";
import { NotificationModule } from "./notification/module.js";
import { AppVersionModule } from "./app-version/module.js";

const envPath = path.join(process.resourcesPath, ".env");
dotenv.config(!isDev() ? { path: envPath } : undefined);

app.disableHardwareAcceleration();

Menu.setApplicationMenu(null);

app.on("ready", async () => {
  await bootstrapModules([
    AppPreloadModule,
    AppModule,
    UpdaterModule,
    AppVersionModule,
    NotificationModule,
  ]);
});
