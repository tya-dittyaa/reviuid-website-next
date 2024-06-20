"use server";

export async function GetForumChildTotal(
  parentId: string
): Promise<number | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the forum child total
    const res = await fetch(`${BACKEND_URL}/forum/child/total/${parentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
    });

    // Check if the response is not okay
    if (!res.ok) {
      return undefined;
    }

    // Parse the response
    const data: number = await res.json();

    // Return the data
    return data;
  } catch (error) {
    // Return false
    return undefined;
  }
}
