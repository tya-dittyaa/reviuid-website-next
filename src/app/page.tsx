"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import "@fontsource/poppins";
import { Layout, Spin, Typography } from "antd";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Text } = Typography;

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
    <Layout style={{ minHeight: "100dvh" }}>
      <HeaderLayout />

      <Content
        style={{
          flex: 1,
          backgroundColor: "#9E140F",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Text style={{ fontSize: 25, justifyContent: "center", color: "#fff" }}>
          Konten sedang dirakit 🥹🥹
        </Text>
      </Content>

      <FooterLayout />
    </Layout>
  );
}
