type TEventPayloadInvoke = {
  getVersion: string;
};

type TEventSendInvoke = {
  getVersion: string;
};

type TInvoke = {
  getVersion: () => Promise<TEventSendInvoke["getVersion"]>;
};
