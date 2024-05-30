"use client";

import { FetchUserLogout } from "@/utils";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await FetchUserLogout();
    }
    logout();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 1000);
  }, [router]);

  return (
    <>
      <Spin fullscreen />
    </>
  );
}
