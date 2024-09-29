"use server";

import { cookies } from "next/headers";

export async function CreateForumChild(
  forum_parent_id: string,
  content: string
): Promise<boolean | null | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return null;

  try {
    // Fetch the forum child
    const res = await fetch(`${BACKEND_URL}/forum/child/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        forum_parent_id,
        content,
      }),
    });

    // If not 201, return false
    if (res.status !== 201) return false;

    return true;
  } catch (error) {
    return undefined;
  }
}
