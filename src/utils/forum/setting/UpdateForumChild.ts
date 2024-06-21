"use server";

import { cookies } from "next/headers";

export async function UpdateForumChild(
  content: string,
  childId: string
): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return false;

  try {
    // Fetch the forum child
    const res = await fetch(`${BACKEND_URL}/forum/child/update/${childId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    console.log(await res.json());

    // If not 200, return false
    if (res.status !== 200) return false;

    return true;
  } catch (error) {
    return undefined;
  }
}
