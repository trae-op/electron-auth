export type TContext = {
  isAuthenticated: boolean | undefined;
};

export type TContextActions = {
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
};
