"use server";

import { FilmData } from "@/types";

export async function GetFilmComingSoon(): Promise<FilmData[] | null> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the film profile
    const res = await fetch(`${BACKEND_URL}/films/display/coming-soon`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
    });

    // Check if the response is not okay
    if (!res.ok) {
      return null;
    }

    // Parse the response
    const data: FilmData[] = await res.json();

    // Return the data
    return data;
  } catch (error) {
    // Return false
    return null;
  }
}
