"use server";

import { FilmCommentValue } from "@/types";
import { cookies } from "next/headers";

export async function GetUserFilmComment(
  filmId: string
): Promise<FilmCommentValue | null> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Get the access token
  const at = cookies().get("at");
  if (!at) return null;

  try {
    // Fetch the user film comment
    const res = await fetch(`${BACKEND_URL}/users/review/${filmId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${at.value}`,
        "x-api-key": HEADER_API_KEY,
      },
    });

    // If the status is not 200, return null
    if (res.status !== 200) return null;

    // Return the data
    const data: FilmCommentValue = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}
