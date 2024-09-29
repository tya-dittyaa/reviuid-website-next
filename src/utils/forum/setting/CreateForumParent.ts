"use server";

import { cookies } from "next/headers";

export async function CreateForumParent(
  title: string,
  content: string
): Promise<string | null | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return null;

  try {
    // Fetch the forum parent
    const res = await fetch(`${BACKEND_URL}/forum/parent/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    // If not 201, return false
    if (res.status !== 201) return null;

    const data = await res.json();
    return data.parentId;
  } catch (error) {
    return undefined;
  }
}
