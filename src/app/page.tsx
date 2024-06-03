"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import "@fontsource/poppins";
import { Layout, Spin, Typography } from "antd";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Text } = Typography;

function TemporaryContent() {
  return (
    <Content
      style={{
        flex: 1,
        backgroundColor: "#9E140F",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <Text style={{ fontSize: 25, color: "#fff" }}>
        Konten sedang dirakit
        <br />
        🥹🥹
      </Text>
    </Content>
  );
}

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
      <TemporaryContent />
      <FooterLayout />
    </Layout>
  );
}
