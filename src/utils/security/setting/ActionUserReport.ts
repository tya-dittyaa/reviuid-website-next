"use server";

import { ReportType } from "@/types";

export async function ActionUserReport(
  reportId: string,
  reportType: ReportType
): Promise<boolean | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    // Fetch the forum parent
    const res = await fetch(`${BACKEND_URL}/security/report/users/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
      body: JSON.stringify({ reportId, reportType }),
    });

    // If not 200, return false
    if (res.status !== 201) return undefined;

    // Return true
    return true;
  } catch (error) {
    return undefined;
  }
}
