"use server";

import { TokenData } from "@/types";
import { cookies } from "next/headers";

export async function FetchRefreshToken(): Promise<string | null> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the refresh token
  const rt = cookies().get("rt");
  if (!rt) return null;

  try {
    // Fetch the user login
    const res = await fetch(`${BACKEND_URL}/auth/user/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rt.value}`,
        "x-api-key": HEADER_API_KEY,
      },
    });

    // If not 200, return false
    if (res.status !== 200) return null;

    // Parse the response
    const result: TokenData = await res.json();

    // Set the cookies
    cookies().set({
      name: "at",
      path: "/",
      value: result.accessToken,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 15,
    });
    cookies().set({
      name: "rt",
      path: "/",
      value: result.refreshToken,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    // Return the access token
    return result.accessToken;
  } catch (error) {
    return null;
  }
}
