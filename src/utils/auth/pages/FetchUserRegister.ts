"use server";

import { RegisterResult, TokenData, UserRegister } from "@/types";
import { cookies } from "next/headers";

export async function FetchUserRegister(
  data: UserRegister
): Promise<RegisterResult> {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Check if username does not contain spaces
  if (data.username.includes(" ")) {
    return {
      code: 400,
      success: false,
      message: `Username tidak boleh mengandung spasi!`,
    };
  }

  try {
    // Fetching the user register data
    const res = await fetch(`${BACKEND_URL}/auth/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    // Get the result
    const result: RegisterResult | TokenData = await res.json();

    // Email already exists
    if ((result as RegisterResult).message === "Email already exists") {
      return {
        code: 400,
        success: false,
        message: "Email sudah terdaftar!",
      };
    }

    // Username already exists
    if ((result as RegisterResult).message === "Username already exists") {
      return {
        code: 400,
        success: false,
        message: "Username sudah terdaftar!",
      };
    }

    // Set the cookies
    cookies().set({
      name: "at",
      path: "/",
      value: (result as TokenData).accessToken,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 15,
    });
    cookies().set({
      name: "rt",
      path: "/",
      value: (result as TokenData).refreshToken,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    // Return the result
    return {
      code: 200,
      success: true,
      message: `Registrasi berhasil!`,
    };
  } catch (error) {
    // Return the error
    return {
      code: 500,
      success: false,
      message: `Terjadi kesalahan pada server! Silakan coba lagi nanti!`,
    };
  }
}
