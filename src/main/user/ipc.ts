import { getElectronStorage } from "../shared/store.js";
import { ipcMainOn } from "../shared/utils.js";

export function registerIpc(): void {
  ipcMainOn("user", (event) => {
    const user = getElectronStorage("user");
    if (user !== undefined) {
      event.reply("user", {
        user,
      });
    }
  });
}
