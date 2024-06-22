export type UserSession = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: "ADMIN" | "USER";
};

export type UserProfile = {
  id: string;
  username: string;
  avatar: string;
  biography: string | null;
};

export type UserSettings = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  biography: string | null;
  role: "ADMIN" | "USER";
};
