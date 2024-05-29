"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import "@fontsource/poppins";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <HeaderLayout />
      <FooterLayout />
    </Layout>
  );
}
