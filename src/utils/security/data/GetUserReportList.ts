"use server";

import { UserReport } from "@/types";

export async function GetUserReportList(): Promise<UserReport[]> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the forum parent
    const res = await fetch(`${BACKEND_URL}/security/report/users/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
    });

    // If not 200, return false
    if (res.status !== 200) return [];

    // Return the data
    const data: UserReport[] = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}
