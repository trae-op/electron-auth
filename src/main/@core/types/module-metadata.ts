import { TIpcHandlerInterface } from "./ipc-handler.js";
import { Constructor } from "./constructor.js";

export interface RgModuleMetadata {
  imports?: Constructor[];
  ipc?: (new (...args: any[]) => TIpcHandlerInterface)[];
  windows?: Constructor[];
  providers?: Constructor[];
  exports?: Constructor[];
}
