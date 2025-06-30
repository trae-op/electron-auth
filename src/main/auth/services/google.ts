import { net } from "electron";
import { decode as decodeJwt } from "jsonwebtoken";
import { restApi } from "../../config.js";
import { logger } from "../../shared/logger.js";

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

    const response = await net.fetch(restApi.urls.auth.googleToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      logger.error(
        "Error exchange code for tokens:",
        `${response.status} - ${errorData.error_description || errorData.error}`
      );
      throw new Error(
        `Failed to exchange code for tokens: ${response.status} - ${
          errorData.error_description || errorData.error
        }`
      );
    }

    return response.json();
  }
}

export function parseIdToken(idToken: string): TPartialUser | undefined {
  try {
    const decodedToken: any = decodeJwt(idToken);

    if (decodedToken) {
      const userProfile: TPartialUser = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        provider: "google",
      };

      return userProfile;
    }
  } catch (error) {
    logger.error("Error parsing ID token:", error);
    throw new Error(
      `Failed parsing ID token: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
