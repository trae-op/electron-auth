type TUser = {
  id: number;
  email: string;
  name: string;
  picture: string;
  provider: "google" | null;
};

type TOmitUser = Omit<TUser, "id" | "picture">;
type TOptionalUser = Partial<Pick<TUser, "id" | "picture">>;
type TPartialUser = TOmitUser & TOptionalUser;
