"use client";

import {
  AdminPanelHorizontal,
  AdminPanelVertical,
  FooterLayout,
  HeaderLayout,
} from "@/components";
import {
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserSession } from "@/types";
import { GetUserSession } from "@/utils";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const { Content } = Layout;

function AdminLayout() {
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
      {layout === "horizontal" ? (
        <AdminPanelHorizontal />
      ) : (
        <AdminPanelVertical />
      )}
    </Content>
  );
}

export default function AdminPage() {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    if (!user || user.role !== "ADMIN") {
      window.location.href = "/";
    } else {
      setUserSession(user);
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
          <AdminLayout />
          <FooterLayout />
          <Toaster richColors position="bottom-right" />
        </Layout>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
