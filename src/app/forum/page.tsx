"use client";

import {
  FooterLayout,
  ForumListHorizontal,
  ForumListVertical,
  HeaderLayout,
} from "@/components";
import {
  ForumParentTotalProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useForumParentTotal,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserSession } from "@/types";
import { GetForumParentTotal, GetUserSession } from "@/utils";
import { Layout, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const { Content } = Layout;

function ForumLayout() {
  const layout = useViewLayout();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalForumParent = useForumParentTotal();

  const getPage = searchParams.get("page");
  const getSearch = searchParams.get("search");

  const totalPage = Math.ceil(totalForumParent / 10);

  useEffect(() => {
    if (getSearch) {
      router.replace(`${pathname}?search=${getSearch}`);
    } else if (
      !getPage ||
      isNaN(Number(getPage)) ||
      Number(getPage) < 1 ||
      Number(getPage) > totalPage
    ) {
      router.replace(`${pathname}?page=1`, { scroll: false });
    }
  }, [getPage, getSearch, totalPage, pathname, router]);

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
        <ForumListHorizontal />
      ) : (
        <ForumListVertical />
      )}
    </Content>
  );
}

export default function ForumPage() {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [totalForumParent, setTotalForumParent] = useState<number>(0);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
  };

  const getForumParentTotal = async () => {
    const response = await GetForumParentTotal();
    if (response) setTotalForumParent(response);
    else setTotalForumParent(0);
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
    getForumParentTotal();
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
        <ForumParentTotalProvider total={totalForumParent}>
          <Layout style={{ minHeight: "100dvh" }}>
            <HeaderLayout />
            <ForumLayout />
            <FooterLayout />
            <Toaster richColors position="bottom-right" />
          </Layout>
        </ForumParentTotalProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
