"use server";

import { cookies } from "next/headers";

export async function FetchDeleteAccount(): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return false;

  try {
    // Fetch the user account
    const res = await fetch(`${BACKEND_URL}/users/delete/profile`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
      },
    });

    // Check the response
    if (!res.ok) return false;
    return true;
  } catch (error) {
    return undefined;
  }
}