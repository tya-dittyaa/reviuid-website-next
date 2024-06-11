"use server";

import { cookies } from "next/headers";

export async function FetchDeleteAvatar(): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return false;

  try {
    // Fetch the user avatar
    const res = await fetch(`${BACKEND_URL}/users/delete/avatar`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
      },
    });

    // If not 200, return false
    if (res.status !== 200) return false;

    // Return true
    return true;
  } catch (error) {
    return undefined;
  }
}

export async function FetchUploadAvatar(
  formData: FormData
): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return false;

  try {
    // Fetch the user avatar
    const res = await fetch(`${BACKEND_URL}/users/update/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
      },
      body: formData,
    });

    // If not 200, return false
    if (res.status !== 200) return false;

    // Return true
    return true;
  } catch (error) {
    return undefined;
  }
}
