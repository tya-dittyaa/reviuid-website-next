"use server";

import { FilmCommentData } from "@/types";

export async function GetFilmCommentByPage(
  filmId: string,
  page: number
): Promise<FilmCommentData[] | null> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    const res = await fetch(
      `${BACKEND_URL}/films/search/${filmId}/reviews/${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": HEADER_API_KEY,
        },
      }
    );

    // If the status is not 200, return null
    if (res.status !== 200) return null;

    // Return the data
    const data: FilmCommentData[] = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}
