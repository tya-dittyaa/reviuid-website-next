"use client";

import {
  DividerCenter,
  FooterLayout,
  HeaderLayout,
  UserHomeHeader,
  UserHomeHorizontal,
  UserHomeTabs,
  UserHomeVertical,
} from "@/components";
import {
  UserProfileProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserProfile, UserSession } from "@/types";
import { GetUserProfile, GetUserSession } from "@/utils";
import { Layout, Spin } from "antd";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const { Content } = Layout;

function BodyLayout() {
  const layout = useViewLayout();

  return (
    <Content
      style={{
        flex: 1,
        backgroundColor: "#9E140F",
        display: "flex",
        flexDirection: "column",
        padding: layout === "horizontal" ? "2rem" : "1rem",
      }}
    >
      <UserHomeHeader />
      <DividerCenter />
      {layout === "vertical" ? <UserHomeVertical /> : <UserHomeHorizontal />}
      <DividerCenter />
      <UserHomeTabs />
    </Content>
  );
}

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
  };

  const getUserProfile = async (username: string) => {
    const response = await GetUserProfile(username);
    if (typeof response !== "number") {
      setUserProfile(response);
    }
  };

  useEffect(() => {
    if (size.width && size.width < 800) {
      setLayout("vertical");
    } else {
      setLayout("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    getUserProfile(params.username);
    getUserSession();
  }, [params.username]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (!userProfile) {
    return notFound();
  }

  return (
    <ViewLayoutProvider view={layout}>
      <UserSessionProvider user={userSession}>
        <UserProfileProvider user={userProfile}>
          <Layout style={{ minHeight: "100dvh" }}>
            <HeaderLayout />
            <BodyLayout />
            <FooterLayout />
          </Layout>
        </UserProfileProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
