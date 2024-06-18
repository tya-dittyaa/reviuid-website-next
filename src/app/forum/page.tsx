"use client";

import { DividerCenter, FooterLayout, HeaderLayout } from "@/components";
import ForumTextHeader from "@/components/forum/list/export/ForumTextHeader";
import {
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserSession } from "@/types";
import { GetUserSession } from "@/utils";
import { Card, Layout, Spin, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Title } = Typography;

function ForumLayout() {
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
      <ForumTextHeader />
      <DividerCenter />

      <Card
        style={{
          background: "#E2E0D8",
          textAlign: "center",
        }}
      >
        <Meta
          title={
            <Title level={5} style={{ color: "gray", margin: 0 }}>
              Akan Segera Hadir!
            </Title>
          }
        />
      </Card>
    </Content>
  );
}

export default function ForumPage() {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
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
          <ForumLayout />
          <FooterLayout />
        </Layout>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
