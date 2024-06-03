"use server";

import { cookies } from "next/headers";
import { FetchRefreshToken } from "../session/FetchRefreshToken";

export async function FetchUserLogout(): Promise<void> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the refresh token
  const rt = cookies().get("rt");
  if (!rt) return;

  // Get the access token
  const at = await FetchRefreshToken();
  if (!at) return;

  try {
    // Fetch the user logout
    const res = await fetch(`${BACKEND_URL}/auth/user/signout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
        "x-api-key": HEADER_API_KEY,
      },
    });

    // Remove the cookies
    if (res.status === 200) {
      cookies().delete("at");
      cookies().delete("rt");
    }

    return;
  } catch (error) {
    return;
  }
}
