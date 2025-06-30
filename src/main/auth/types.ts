import { User } from "@prisma/client";

export type TProvidersIpc = {
  createUser: (data: TPartialUser) => Promise<User | undefined> | undefined;
};
