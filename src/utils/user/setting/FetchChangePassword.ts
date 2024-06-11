"use server";

import { cookies } from "next/headers";

export async function FetchChangePassword(
  password: string
): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return false;

  try {
    // Fetch the user password
    const res = await fetch(`${BACKEND_URL}/users/update/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    // Check the response
    if (!res.ok) return false;
    return true;
  } catch (error) {
    return undefined;
  }
}
