type TOpenLatestVersion = {
  updateFile: string;
};

type TEventPayloadSend = {
  restart: undefined;
  windowClosePreload: undefined;
  windowAuth: undefined;
  openLatestVersion: TOpenLatestVersion;
};

type TSend = {
  restart: () => void;
  windowClosePreload: () => void;
  windowAuth: () => void;
  openLatestVersion: (payload: TEventPayloadSend["openLatestVersion"]) => void;
};
