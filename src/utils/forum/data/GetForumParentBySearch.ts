"use server";

import { ForumListParentData } from "@/types";

export async function GetForumParentBySearch(
  search: string
): Promise<ForumListParentData[] | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the forum parent list
    const res = await fetch(
      `${BACKEND_URL}/forum/parent/display/search/${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": HEADER_API_KEY,
        },
      }
    );

    // Check if the response is not okay
    if (!res.ok) {
      return undefined;
    }

    // Parse the response
    const data: ForumListParentData[] = await res.json();

    // Return the data
    return data;
  } catch (error) {
    // Return false
    return undefined;
  }
}
