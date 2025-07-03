import { User } from "@prisma/client";
import { restApi } from "../config.js";

export type TProvidersIpc = {
  createUser: (data: TPartialUser) => Promise<User | undefined> | undefined;
  getUser: (where: Partial<User>) => Promise<User | null>;
};

export type TLessProviders = typeof restApi.urls.auth;
