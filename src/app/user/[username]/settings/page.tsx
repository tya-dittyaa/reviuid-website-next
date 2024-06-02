"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { useWindowSize } from "@/hooks";
import { UserProfile, UserSession } from "@/types";
import { GetUserProfile, GetUserSession } from "@/utils";
import { Layout, Spin, Typography } from "antd";
import { notFound } from "next/navigation";
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
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <Text style={{ fontSize: 25, justifyContent: "center", color: "#fff" }}>
        Konten sedang dirakit
        <br />
        🥹🥹
      </Text>
    </Content>
  );
}

export default function SettingsPage({
  params,
}: {
  params: { username: string };
}) {
  const size = useWindowSize();
  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  useEffect(() => {
    if (size.width && size.width < 800) {
      setLayout("vertical");
    } else {
      setLayout("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await GetUserProfile(params.username);
      if (typeof response !== "number") {
        console.log(response);
        setUserData(response);
      }
      return;
    };
    getUserData();
  }, [params.username]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await GetUserSession();
      setUserSession(response);
    };
    getUserData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (!userData) {
    return notFound();
  }

  if (!userSession || userSession.username !== params.username) {
    return notFound();
  }

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <HeaderLayout />
      <TemporaryContent />
      <FooterLayout />
    </Layout>
  );
}
