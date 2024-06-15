"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { UserSessionProvider, ViewLayoutProvider } from "@/context";
import { useWindowSize } from "@/hooks";
import { UserSession } from "@/types";
import { GetUserSession } from "@/utils";
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
        backgroundColor: "#910D05",
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
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
    setIsLoading(false);
  };

  useEffect(() => {
    if (size.width && size.width < 800) {
      setLayout("vertical");
    } else {
      setLayout("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    getUserSession();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <ViewLayoutProvider view={layout}>
      <UserSessionProvider user={userSession}>
        <Layout style={{ minHeight: "100dvh" }}>
          <HeaderLayout />
          <TemporaryContent />
          <FooterLayout />
        </Layout>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
