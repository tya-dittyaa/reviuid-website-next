"use server";

import { UserLogin } from "@/types";
import { LoginResult } from "@/types/userLogin.type";

export const FetchUserLogin = async (data: UserLogin): Promise<number> => {
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result: LoginResult = await res.json();
    // cookies().set("userId", result.user.id, { secure: true });
    // cookies().set("username", result.user.username, { secure: true });
    // cookies().set("email", result.user.email, { secure: true });
    // cookies().set("role", result.user.role, { secure: true });
    // cookies().set("accessToken", result.tokens.accessToken, { secure: true });
    // cookies().set("refreshToken", result.tokens.refreshToken, { secure: true });

    return res.status;
  } catch (error) {
    return 500;
  }
};
