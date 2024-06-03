"use server";

import { UserProfile } from "@/types";

export async function GetUserProfile(
  username: string
): Promise<UserProfile | number> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the user login
    const resProfile = await fetch(
      `${BACKEND_URL}/users/display/profile/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": HEADER_API_KEY,
        },
      }
    );

    // Response is 200
    if (resProfile.status === 200) {
      const profile: UserProfile = await resProfile.json();
      return profile;
    }

    // Return the status
    return resProfile.status;
  } catch (error) {
    // Return false
    return 500;
  }
}
