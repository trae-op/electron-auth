import { useCallback, useMemo } from "react";
import type { THookControl } from "./types";

export const useControl = (): THookControl => {
  const handleProvider = useCallback(() => {
    window.electron.send.windowAuth();
  }, []);

  const handleLogout = useCallback(() => {}, []);

  const value = useMemo(
    () => ({
      handleLogout,
      handleProvider,
    }),
    [handleLogout, handleProvider]
  );

  return value;
};
