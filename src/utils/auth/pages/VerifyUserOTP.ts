"use server";

import { UserOtpType } from "@/types";

export async function VerifyUserOTP({
  email,
  otp,
  type,
}: {
  email: string;
  otp: string;
  type: UserOtpType;
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
        type,
      }),
    });

    if (res.status === 201) return 1;

    const result: { message: string } = await res.json();
    if (result.message === "OTP not found") return 2;
    if (result.message === "Invalid OTP") return 3;
    if (result.message === "Invalid OTP type") return 4;
    if (result.message === "OTP expired") return 5;
  } catch (error) {
    return undefined;
  }
}
