"use server";

export const fetchUserLogin = async (email: string, password: string) => {
  const BACKEND_URL = process.env.BACKEND_URL as string;
  const HEADER_API_KEY = process.env.HEADER_API_KEY as string;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": HEADER_API_KEY,
      },
      body: JSON.stringify({ email, password }),
    });

    return res.status;
  } catch (error) {
    return 500;
  }
};
