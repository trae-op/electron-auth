const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  receive: {
    subscribeUpdateApp: (callback) =>
      ipcOn("updateApp", (payload) => {
        callback(payload);
      }),
    subscribeWindowAuth: (callback) =>
      ipcOn("auth", (payload) => {
        callback(payload);
      }),
    subscribeWindowOpenUpdateApp: (callback) =>
      ipcOn("openUpdateApp", (payload) => {
        callback(payload);
      }),
    subscribeUser: (callback) =>
      ipcOn("user", (payload) => {
        callback(payload);
      }),
  },
  send: {
    restart: () => {
      ipcSend("restart");
    },
    checkUser: () => {
      ipcSend("checkUser");
    },
    windowAuth: (payload) => {
      ipcSend("windowAuth", payload);
    },
    windowClosePreload: () => {
      ipcSend("windowClosePreload");
    },
    openLatestVersion: (payload) => {
      ipcSend("openLatestVersion", payload);
    },
  },
  invoke: {
    getVersion: () => ipcInvoke("getVersion"),
  },
} satisfies Window["electron"]);

function ipcInvoke<
  Key extends keyof TEventPayloadInvoke,
  S extends keyof TEventSendInvoke
>(key: Key, payload?: TEventSendInvoke[S]): Promise<TEventPayloadInvoke[Key]> {
  return electron.ipcRenderer.invoke(key, payload);
}

function ipcSend<Key extends keyof TEventPayloadSend>(
  key: Key,
  payload?: TEventPayloadSend[Key]
) {
  electron.ipcRenderer.send(key, payload);
}

function ipcOn<Key extends keyof TEventPayloadReceive>(
  key: Key,
  callback: (payload: TEventPayloadReceive[Key]) => void
) {
  const cb = (
    _: Electron.IpcRendererEvent,
    payload: TEventPayloadReceive[Key]
  ) => callback(payload);

  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
