import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  type Event,
  type WebContentsWillRedirectEventParams,
} from "electron";
import type { TParamsCreateWindow } from "../control-window/types.js";

export interface WindowManagerOptions extends TParamsCreateWindow {
  options: BrowserWindowConstructorOptions;
}

export type TWindowManager = {
  onDidFinishLoad?: (window: BrowserWindow) => void;
  onShow?: (window: BrowserWindow) => void;
  onHide?: (window: BrowserWindow) => void;
  onClose?: (event: Event, window: BrowserWindow) => void;
  onWillRedirect?: (
    event: Event<WebContentsWillRedirectEventParams>,
    url: string,
    window: BrowserWindow
  ) => void;
};
