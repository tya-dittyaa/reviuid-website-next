export type UserSession = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: "ADMIN" | "USER";
};
