"use server";

import { cookies } from "next/headers";

export async function CheckAvailableUsername(
  username: string
): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the user username
    const res = await fetch(`${BACKEND_URL}/users/check/username`, {
      method: "POST",
      headers: {
        "x-api-key": HEADER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    // Check the response
    const data: boolean = await res.json();
    if (data === true) return false;
    return true;
  } catch (error) {
    return undefined;
  }
}

export async function FetchChangeUsername(
  username: string
): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return false;

  try {
    // Fetch the user username
    const res = await fetch(`${BACKEND_URL}/users/update/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    // Check the response
    if (!res.ok) return false;
    return true;
  } catch (error) {
    return undefined;
  }
}
