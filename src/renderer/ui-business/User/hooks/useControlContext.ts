import { useContext } from "react";
import { Context, ContextActions, ContextUserPopover } from "../context";

export const useControlContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useControlContext must be used inside Provider");
  }
  return context;
};

export const useControlContextActions = () => {
  const context = useContext(ContextActions);

  if (!context) {
    throw new Error("useControlContextActions must be used inside Provider");
  }
  return context;
};

export const useControlContextUserPopover = () => {
  const context = useContext(ContextUserPopover);

  if (!context) {
    throw new Error(
      "useControlContextUserPopover must be used inside Provider"
    );
  }
  return context;
};
