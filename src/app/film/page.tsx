"use client";

import {
  DividerCenter,
  FooterLayout,
  HeaderLayout,
  ListFilmHeader,
  ListFilmPageCard,
  ListFilmSearchAndPage,
  ListFilmSearchCard,
} from "@/components";
import {
  FilmTotalProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserSession } from "@/types";
import { GetFilmTotal, GetUserSession } from "@/utils";
import { Layout, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Content } = Layout;

function FilmList() {
  const layout = useViewLayout();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getPage = searchParams.get("page");
  const getSearch = searchParams.get("search");

  const [onWebParam, setOnWebParam] = useState<"page" | "search">("page");

  useEffect(() => {
    if (getPage) {
      setOnWebParam("page");
      router.replace(`${pathname}?page=${getPage}`, { scroll: false });
    } else if (getSearch) {
      setOnWebParam("search");
      router.replace(`${pathname}?search=${getSearch}`, { scroll: false });
    }
  }, [getPage, getSearch, pathname, router]);

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
      <ListFilmHeader />
      <DividerCenter />
      <ListFilmSearchAndPage />
      {onWebParam === "page" ? <ListFilmPageCard /> : <ListFilmSearchCard />}
    </Content>
  );
}

export default function FilmPage() {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [totalPage, setTotalPage] = useState<number>(0);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
  };

  const getTotalPage = async () => {
    const response = await GetFilmTotal();
    if (response) setTotalPage(response);
    else setTotalPage(0);
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
    getTotalPage();
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
        <FilmTotalProvider total={totalPage}>
          <Layout style={{ minHeight: "100dvh" }}>
            <HeaderLayout />
            <FilmList />
            <FooterLayout />
          </Layout>
        </FilmTotalProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
