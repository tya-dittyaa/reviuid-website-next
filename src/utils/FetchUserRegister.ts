"use server";

import { RegisterResult, UserRegister } from "@/types";

export const FetchUserRegister = async (
  data: UserRegister
): Promise<RegisterResult> => {
  // Get the environment variables
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  // Check if username has at least 3 characters and does not contain spaces
  if (data.username.length < 3 || data.username.includes(" ")) {
    return {
      code: 400,
      success: false,
      message: `Username harus memiliki setidaknya 3 huruf dan tidak mengandung spasi!`,
    };
  }

  // Check if password meets the requirements
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|\\])[A-Za-z\d*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|\\]{8,32}$/;
  if (!regex.test(data.password)) {
    return {
      code: 400,
      success: false,
      message: `Password harus terdiri dari setidaknya 1 angka, 1 huruf kecil, 1 huruf kapital, 1 karakter khusus, dan memiliki panjang antara 8 hingga 32 karakter!`,
    };
  }

  // Check if password and confirm password are the same
  if (data.password !== data.confirmPassword) {
    return {
      code: 400,
      success: false,
      message: `Password dan Confirm Password tidak cocok!`,
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
    const result = await res.json();

    // Email already exists
    if (result.message === "Email already exists") {
      return {
        code: 400,
        success: false,
        message: "Email sudah terdaftar!",
      };
    }

    // Username already exists
    if (result.message === "Username already exists") {
      return {
        code: 400,
        success: false,
        message: "Username sudah terdaftar!",
      };
    }

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
};
