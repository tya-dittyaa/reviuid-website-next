export type UserLogin = {
  email: string;
  password: string;
};

export type LoginResult = {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};
