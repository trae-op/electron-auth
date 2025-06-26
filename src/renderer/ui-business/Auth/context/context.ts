import { createContext } from "react";
import type { TContext, TContextActions } from "./type";

export const Context = createContext<TContext | undefined>(undefined);
export const ContextActions = createContext<TContextActions | undefined>(
  undefined
);
