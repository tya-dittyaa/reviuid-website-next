export type UserSession = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: "ADMIN" | "USER";
};

export type UserProfile = {
  username: string;
  avatar: string;
  biography: string | null;
};

export type UserSettings = {
  username: string;
  email: string;
  avatar: string;
  biography: string | null;
  role: "ADMIN" | "USER";
};
