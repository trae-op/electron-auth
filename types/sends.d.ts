type TOpenLatestVersion = {
  updateFile: string;
};

type TEventPayloadSend = {
  restart: undefined;
  closePreloadWindow: undefined;
  openLatestVersion: TOpenLatestVersion;
};

type TSend = {
  restart: () => void;
  closePreloadWindow: () => void;
  openLatestVersion: (payload: TEventPayloadSend["openLatestVersion"]) => void;
};
