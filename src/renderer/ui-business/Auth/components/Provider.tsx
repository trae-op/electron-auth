import { useState, useEffect, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";
import { TContext } from "../context/type";

export const Provider = ({ children }: TPropsProvider) => {
  const [isAuthenticated, setAuthenticated] =
    useState<TContext["isAuthenticated"]>(undefined);

  const logout = () => {
    setAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
    }),
    [isAuthenticated]
  );

  const actions = useMemo(
    () => ({
      setAuthenticated,
      logout,
    }),
    [setAuthenticated, logout]
  );

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
