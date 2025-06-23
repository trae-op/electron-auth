import { useEffect, useState } from "react";
import isEqual from "lodash.isequal";

export const useIpc = (): TUpdateData => {
  const [result, setResult] = useState<TUpdateData>({
    status: "checking-for-update",
  });

  useEffect(() => {
    const unSub = window.electron.receive.subscribeUpdateApp((payload) => {
      setResult((prevPayload) => {
        if (isEqual(prevPayload, payload)) {
          return prevPayload;
        }
        return payload;
      });
    });

    return unSub;
  }, []);

  return result;
};
