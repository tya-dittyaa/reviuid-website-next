"use client";

import {
  FooterLayout,
  ForumDetailHorizontal,
  ForumDetailVertical,
  HeaderLayout,
} from "@/components";
import {
  ForumChildTotalProvider,
  ForumParentDataProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useForumChildTotal,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { ForumParentData, UserSession } from "@/types";
import {
  GetForumChildTotal,
  GetForumParentById,
  GetUserSession,
} from "@/utils";
import { Layout, Spin } from "antd";
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const { Content } = Layout;

function ForumLayout() {
  const layout = useViewLayout();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalForumChild = useForumChildTotal();

  const getPage = searchParams.get("page");

  const totalPage = Math.ceil(totalForumChild / 10);

  useEffect(() => {
    if (
      !getPage ||
      isNaN(Number(getPage)) ||
      Number(getPage) < 1 ||
      Number(getPage) > totalPage
    ) {
      router.replace(`${pathname}?page=1`, { scroll: false });
    }
  }, [getPage, totalPage, pathname, router]);

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
        <ForumDetailHorizontal />
      ) : (
        <ForumDetailVertical />
      )}
    </Content>
  );
}

export default function ForumPage({ params }: { params: { forumId: string } }) {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [forumData, setForumData] = useState<ForumParentData | undefined>(
    undefined
  );
  const [totalForumChild, setTotalForumChild] = useState<number>(0);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
  };

  const getForumData = async (forumId: string) => {
    const data = await GetForumParentById(forumId);
    setForumData(data);
  };

  const getForumChildTotal = async (parentId: string) => {
    const total = await GetForumChildTotal(parentId);
    setTotalForumChild(total || 0);
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
    getForumChildTotal(params.forumId);
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
        <ForumParentDataProvider forumParent={forumData}>
          <ForumChildTotalProvider total={totalForumChild}>
            <Layout style={{ minHeight: "100dvh" }}>
              <HeaderLayout />
              <ForumLayout />
              <FooterLayout />
              <Toaster richColors position="bottom-right" />
            </Layout>
          </ForumChildTotalProvider>
        </ForumParentDataProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
