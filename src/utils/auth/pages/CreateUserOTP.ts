"use server";

import { UserOtpType } from "@/types";

export async function CreateUserOTP({
  email,
  type,
}: {
  email: string;
  type: UserOtpType;
}): Promise<number | undefined> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/user/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
      body: JSON.stringify({
        email,
        type,
      }),
    });

    if (res.status === 201) return 1;

    const result: { message: string } = await res.json();
    if (result.message === "Email already exists") return 2;
    if (result.message === "OTP already sent") return 3;
    if (result.message === "Failed to send OTP") return 4;
  } catch (error) {
    return undefined;
  }
}
