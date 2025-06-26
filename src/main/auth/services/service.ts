import { dialog, net } from "electron";
import { decode as decodeJwt } from "jsonwebtoken";
import { UserProfile } from "./types.js";
import { restApi } from "../../config.js";

export async function exchangeCodeForTokens(code: string): Promise<any> {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  if (GOOGLE_CLIENT_ID && GOOGLE_REDIRECT_URI && GOOGLE_CLIENT_SECRET) {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
      code: code,
      client_secret: GOOGLE_CLIENT_SECRET,
    });

    const response = await net.fetch(restApi.urls.googleToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to exchange code for tokens: ${response.status} - ${
          errorData.error_description || errorData.error
        }`
      );
    }

    return response.json();
  }
}

export function parseIdToken(idToken: string): UserProfile | undefined {
  try {
    const decodedToken: any = decodeJwt(idToken);

    if (decodedToken) {
      const userProfile: UserProfile = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        givenName: decodedToken.given_name,
        familyName: decodedToken.family_name,
      };

      return userProfile;
    }
  } catch (error) {
    if (error instanceof Error) {
      dialog.showMessageBox({
        title: "Failed to decode ID Token",
        message: error.message,
      });
    }
  }
  return undefined;
}
