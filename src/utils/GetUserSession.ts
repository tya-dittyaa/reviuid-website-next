"use server";

import { UserSession } from "@/types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { FetchRefreshToken } from "./FetchRefreshToken";

export const GetUserSession = async (): Promise<UserSession | null> => {
  // Get the environment variables
  const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

  // Initialize the access token
  let accessToken: string = "";

  // Get the refresh token
  const rt = cookies().get("rt");
  if (!rt) return null;

  // Check the access token
  const at = cookies().get("at");
  if (at) {
    accessToken = at.value;
  } else {
    const newAt = await FetchRefreshToken();
    if (!newAt) return null;
    accessToken = newAt;
  }

  // Verify the access token
  const token = Buffer.from(JWT_ACCESS_SECRET, "base64").toString("utf-8");
  const secret = new TextEncoder().encode(token);
  const verify = await jwtVerify(accessToken, secret);

  // Fill the session
  const session: UserSession = {
    id: verify.payload.sub as string,
    username: verify.payload.username as string,
    email: verify.payload.email as string,
    avatar: verify.payload.avatar as string,
    role: verify.payload.role as UserSession["role"],
  };

  // Return the session
  return session;
};
