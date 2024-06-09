"use client";

import {
  DividerCenter,
  FilmComment,
  FilmTextHeader,
  FooterLayout,
  HeaderLayout,
} from "@/components";
import FilmDescription from "@/components/film/export/FilmDescription";
import {
  FilmDataProvider,
  UserFilmCommentProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { FilmCommentValue, FilmData, UserSession } from "@/types";
import { GetFilmData, GetUserFilmComment, GetUserSession } from "@/utils";
import { Layout, Spin } from "antd";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const { Content } = Layout;

function FilmFound() {
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
      <FilmTextHeader />
      <DividerCenter />
      <FilmDescription />
      <DividerCenter />
      <FilmComment />
    </Content>
  );
}

export default function ProfilePage({
  params,
}: {
  params: { filmId: string };
}) {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [filmData, setFilmData] = useState<FilmData | null>(null);
  const [userComment, setUserComment] = useState<FilmCommentValue | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
  };

  const getFilmData = async (filmId: string) => {
    const response = await GetFilmData(filmId);
    if (response) setFilmData(response);
    else setFilmData(null);
  };

  const getUserComment = async (filmId: string) => {
    const response = await GetUserFilmComment(filmId);
    setUserComment(response);
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
    getFilmData(params.filmId);
    getUserComment(params.filmId);
  }, [params.filmId]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (!filmData) {
    return notFound();
  }

  return (
    <ViewLayoutProvider view={layout}>
      <UserSessionProvider user={userSession}>
        <FilmDataProvider film={filmData}>
          <UserFilmCommentProvider value={userComment}>
            <Layout style={{ minHeight: "100dvh" }}>
              <HeaderLayout />
              <FilmFound />
              <FooterLayout />
              <Toaster richColors position="bottom-right" />
            </Layout>
          </UserFilmCommentProvider>
        </FilmDataProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}