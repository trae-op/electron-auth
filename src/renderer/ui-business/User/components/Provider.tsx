import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [user, setUser] = useState<TUser | undefined>(undefined);

  const value = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  const actions = useMemo(
    () => ({
      setUser,
    }),
    [setUser]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
