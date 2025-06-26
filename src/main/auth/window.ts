import {
  net,
  type Event,
  type WebContentsWillRedirectEventParams,
  session,
  dialog,
} from "electron";
import { createWindow } from "../shared/control-window/create.js";
import { exchangeCodeForTokens, parseIdToken } from "./services/service.js";
import { messages } from "../config.js";

export function openWindow(): void {
  const authSession = session.fromPartition("persist:auth");

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
  const GOOGLE_SCOPES = process.env.GOOGLE_SCOPES;

  const loadURL =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${GOOGLE_REDIRECT_URI}&` +
    `scope=${GOOGLE_SCOPES}&` +
    `response_type=code`;

  const window = createWindow<TWindows["auth"]>({
    hash: "window:auth",
    loadURL,
    options: {
      autoHideMenuBar: true,
      minimizable: false,
      maximizable: false,
      title: "",
      width: 400,
      height: 400,
      webPreferences: {
        session: authSession,
      },
    },
  });

  window.webContents.on(
    "will-redirect",
    async (_: Event<WebContentsWillRedirectEventParams>, url: string) => {
      const callBackUrl = new URL(url);
      const searchParams = new URLSearchParams(callBackUrl.search);
      const code = searchParams.get("code");

      if (code !== null) {
        window.close();
        try {
          const tokens = await exchangeCodeForTokens(code);
          console.log("Profile:", parseIdToken(tokens.id_token));
        } catch (error) {
          if (error instanceof Error) {
            dialog.showMessageBox({
              title: "Error exchanging code for tokens",
              message: error.message,
            });
          }
        }
      }
    }
  );
}
