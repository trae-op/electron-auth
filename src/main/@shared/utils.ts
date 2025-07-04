import {
  ipcMain,
  type WebFrameMain,
  type WebContents,
  type IpcMainEvent,
} from "electron";
import { windows } from "../config.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isPlatform(platform: NodeJS.Platform): boolean {
  return process.platform === platform;
}

export function ipcMainHandle<Key extends keyof TEventPayloadInvoke>(
  key: Key,
  handle: () => TEventPayloadInvoke[Key]
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);

    return handle();
  });
}

export function ipcWebContentsSend<Key extends keyof TEventPayloadReceive>(
  key: Key,
  webContentsSend: WebContents,
  payload: TEventPayloadReceive[Key]
) {
  webContentsSend.send(key, payload);
}

export function ipcMainOn<Key extends keyof TEventPayloadSend>(
  key: Key,
  callback: (event: IpcMainEvent, payload: TEventPayloadSend[Key]) => void
): void {
  ipcMain.on(key, (event: IpcMainEvent, data: TEventPayloadSend[Key]) => {
    callback(event, data);
  });
}

function containsAnyIdentifier(
  fullUrl: string,
  identifiers: string[]
): boolean {
  return identifiers.some((identifier) => fullUrl.includes(identifier));
}

export function validateEventFrame(frame: WebFrameMain | null) {
  if (frame === null) {
    throw new Error("Invalid frame: Frame is null");
  }

  const url = new URL(frame.url);

  if (
    isDev() &&
    url.host === `localhost:${process.env.LOCALHOST_ELECTRON_SERVER_PORT}`
  ) {
    return;
  }

  const isPresent = containsAnyIdentifier(frame.url, Object.values(windows));

  if (
    (!isPresent && url.hash !== "") ||
    (url.protocol !== "file:" && url.hash === "")
  ) {
    throw new Error(`The event is from an unauthorized frame: ${frame.url}`);
  }
}
