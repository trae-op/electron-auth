import { useContext } from "react";
import { Context } from "../context";

export const useControlContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useControlContext must be used inside Provider");
  }
  return context;
};
