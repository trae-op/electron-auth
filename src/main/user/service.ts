import { restApi } from "../config.js";
import { get } from "../rest-api/service.js";

export async function getUserById<R extends TUser>(
  id: string
): Promise<R | undefined> {
  const response = await get<R>(
    `${restApi.urls.base}${restApi.urls.baseApi}${
      restApi.urls.user.base
    }${restApi.urls.user.byId(id)}`,
    {
      isCache: true,
    }
  );

  if (response.error !== undefined) {
    return;
  }

  return response.data;
}
