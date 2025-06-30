import { type Event, type WebContentsWillRedirectEventParams } from "electron";
import { User } from "@prisma/client";
import { ipcMainOn, ipcWebContentsSend } from "../shared/utils.js";
import { getWindow } from "../shared/control-window/receive.js";
import { openWindow } from "./window.js";
import { exchangeCodeForTokens, parseIdToken } from "./services/google.js";
import { TProvidersIpc } from "./types.js";
import { getElectronStorage, setElectronStorage } from "../shared/store.js";

export function registerIpc({ createUser }: TProvidersIpc): void {
  ipcMainOn("checkAuth", () => {
    const mainWindow = getWindow<TWindows["main"]>("window:main");
    const user = getElectronStorage("user");

    if (mainWindow !== undefined) {
      ipcWebContentsSend("auth", mainWindow.webContents, {
        isAuthenticated: Boolean(user),
      });
    }
  });

  ipcMainOn("windowAuth", (_, { provider }) => {
    const window = openWindow(provider);

    window.webContents.on(
      "will-redirect",
      async (_: Event<WebContentsWillRedirectEventParams>, url: string) => {
        const callBackUrl = new URL(url);
        const searchParams = new URLSearchParams(callBackUrl.search);
        const code = searchParams.get("code");

        let parseUser = undefined;
        if (code !== null) {
          const tokens = await exchangeCodeForTokens(code);
          parseUser = parseIdToken(tokens.id_token);
        }

        let response: User | undefined = undefined;
        if (parseUser !== undefined) {
          response = await createUser({
            name: parseUser.name,
            email: parseUser.email,
            picture: parseUser.picture,
            provider: "google",
          });
        }

        if (response !== undefined) {
          setElectronStorage("user", response);
          ipcWebContentsSend("auth", window.webContents, {
            isAuthenticated: true,
          });
          window.close();
        }
      }
    );
  });
}
