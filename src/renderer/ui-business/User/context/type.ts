export type TContext = {
  user: TUser | undefined;
};

export type TContextActions = {
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>;
};

export type TContextProfile = {
  renderButtonUpdateApp: React.ReactElement | null;
  renderButtonLogout: React.ReactElement | null;
  isNewVersionApp: boolean;
};
