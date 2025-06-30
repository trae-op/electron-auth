type TOpenLatestVersion = {
  updateFile: string;
};

type TWindowAuth = {
  provider: TProviders;
};

type TEventPayloadSend = {
  restart: undefined;
  windowClosePreload: undefined;
  checkUser: undefined;
  windowAuth: TWindowAuth;
  openLatestVersion: TOpenLatestVersion;
};

type TSend = {
  restart: () => void;
  windowClosePreload: () => void;
  checkUser: () => void;
  windowAuth: (payload: TEventPayloadSend["windowAuth"]) => void;
  openLatestVersion: (payload: TEventPayloadSend["openLatestVersion"]) => void;
};
