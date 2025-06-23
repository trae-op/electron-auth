import { useCallback, useMemo } from "react";
import type { THookUpdateDownloaded } from "./types";
import { useControlContext } from "./useControlContext";

export const useUpdateDownloaded = (): THookUpdateDownloaded => {
  const { platform, updateFile } = useControlContext();

  const handleUpdate = useCallback(() => {
    if (platform === "win32") {
      window.electron.send.restart();
    }

    if (platform !== "win32" && updateFile !== undefined) {
      window.electron.send.openLatestVersion({
        updateFile,
      });
    }
  }, [platform, updateFile]);

  const value = useMemo(() => ({ handleUpdate }), [handleUpdate]);

  return value;
};
