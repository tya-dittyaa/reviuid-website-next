"use server";

import { FilmData } from "@/types";

export async function GetUserFilmWatchlistByPage(
  username: string,
  page: number
): Promise<FilmData[] | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the film list
    const res = await fetch(
      `${BACKEND_URL}/users/display/${username}/watchlist/page/${page}
      `,
      {
        method: "GET",
        headers: {
          "Content-Type": "ap plication/json",
          "x-api-key": HEADER_API_KEY,
        },
      }
    );

    // Check if the response is not okay
    if (!res.ok) {
      return undefined;
    }

    // Parse the response
    const data: FilmData[] = await res.json();

    // Return the data
    return data;
  } catch (error) {
    // Return false
    return undefined;
  }
}
