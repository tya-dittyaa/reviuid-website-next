"use server";

import { LoginResult, UserLogin } from "@/types";
import { cookies } from "next/headers";

export const FetchUserLogin = async (data: UserLogin): Promise<number> => {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetching the user login data
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

    // Get the result
    const result: LoginResult = await res.json();

    // Set the cookies
    cookies().set({
      name: "at",
      value: result.accessToken,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 15,
    });
    cookies().set({
      name: "rt",
      value: result.refreshToken,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    // Return the status code
    return res.status;
  } catch (error) {
    // Return the error
    return 500;
  }
};
