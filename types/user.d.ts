const { User } = require("@prisma/client");

type TUser = User;

type TOmitUser = Omit<TUser, "id" | "picture">;
type TOptionalUser = Partial<Pick<TUser, "id" | "picture">>;
type TPartialUser = TOmitUser & TOptionalUser;
