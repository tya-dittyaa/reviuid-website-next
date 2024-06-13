"use server";

export async function VerifyUserOTP({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<number | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/user/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    if (res.status === 201) return 1;

    const result: { message: string } = await res.json();
    if (result.message === "Email already exists") return 2;
    if (result.message === "User not found") return 3;
    if (result.message === "Invalid OTP") return 4;
    if (result.message === "OTP expired") return 5;
  } catch (error) {
    return undefined;
  }
}
