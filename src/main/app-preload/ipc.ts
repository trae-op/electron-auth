import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import type {
  TIpcHandlerInterface,
  TParamOnInit,
} from "../@core/types/ipc-handler.js";

@IpcHandler()
export class AppPreloadIpc implements TIpcHandlerInterface {
  constructor() {}

  onInit({ getWindow }: TParamOnInit<TWindows["preloadApp"]>) {
    const mainWindow = getWindow("window:preload-app");
    mainWindow.create();
  }
}
