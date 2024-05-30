"use server";

import { UserProfile } from "@/types";

export async function GetUserProfile(
  username: string
): Promise<UserProfile | string> {
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

    // If not 200, return false
    if (resProfile.status !== 200) return "Akun yang dicari tidak ditemukan!";

    // Get the user profile
    const profile: UserProfile = await resProfile.json();

    // Return the user profile
    return profile;
  } catch (error) {
    // Return false
    return "Server sedang mengalami gangguan! Coba lagi nanti!";
  }
}
