import { createContext } from "react";
import type { TContext, TContextActions, TContextProfile } from "./type";

export const Context = createContext<TContext | undefined>(undefined);
export const ContextActions = createContext<TContextActions | undefined>(
  undefined
);
export const ContextUserPopover = createContext<TContextProfile | undefined>(
  undefined
);
