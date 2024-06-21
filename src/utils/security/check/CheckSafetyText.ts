"use server";

export async function CheckSafetyText(
  text: string
): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the forum parent
    const res = await fetch(`${BACKEND_URL}/security/check/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
      body: JSON.stringify({ text }),
    });

    // If not 200, return false
    if (res.status !== 201) return undefined;

    // Return the data
    const data: boolean = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}
