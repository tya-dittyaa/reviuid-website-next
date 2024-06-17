"use server";

export async function FetchForgotPassword(
  email: string
): Promise<number | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (res.status === 201) return 1;

    const result: { message: string } = await res.json();
    if (result.message === "Email not found") return 2;
    if (result.message === "Failed to send email") return 3;
  } catch (error) {
    return undefined;
  }
}
