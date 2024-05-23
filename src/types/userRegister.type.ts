export type UserRegister = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResult = {
  code: number;
  success: boolean;
  message: string;
};
