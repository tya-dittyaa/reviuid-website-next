"use client";

import {
  FooterLayout,
  ForumDetailHorizontal,
  HeaderLayout,
} from "@/components";
import {
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { ForumParentData, UserSession } from "@/types";
import { GetForumParentById, GetUserSession } from "@/utils";
import { Layout, Spin } from "antd";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const { Content } = Layout;

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
      <ForumDetailHorizontal />
    </Content>
  );
}

export default function ForumPage({ params }: { params: { forumId: string } }) {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [forumData, setForumData] = useState<ForumParentData | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
  };

  const getForumData = async (forumId: string) => {
    const data = await GetForumParentById(forumId);
    if (data) setForumData(data);
    else setForumData(null);
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
    getForumData(params.forumId);
  }, [params.forumId]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (!forumData) {
    return notFound();
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
