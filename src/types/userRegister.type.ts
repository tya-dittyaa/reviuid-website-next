export type UserRegister = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type RegisterResult = {
  code: number;
  success: boolean;
  message: string;
};
