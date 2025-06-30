import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setUser } = useControlContextActions();

  useEffect(() => {
    window.electron.send.user();
  }, []);

  useEffect(() => {
    const unSub = window.electron.receive.subscribeUser(({ user }) => {
      setUser(user);
    });

    return unSub;
  }, []);
};
