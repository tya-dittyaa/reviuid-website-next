"use client";

import {
  DetailFilmHeader,
  DividerCenter,
  FilmComment,
  FilmDescription,
  FooterLayout,
  HeaderLayout,
} from "@/components";
import {
  FilmDataProvider,
  UserFilmCommentProvider,
  UserFilmFavoriteProvider,
  UserFilmWatchlistProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { FilmData, FilmReviewValue, UserSession } from "@/types";
import {
  CheckUserFilmFavorite,
  CheckUserFilmWatchlist,
  GetFilmData,
  GetUserFilmComment,
  GetUserSession,
} from "@/utils";
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
      <DetailFilmHeader />
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
  const [userComment, setUserComment] = useState<FilmReviewValue | null>(null);
  const [userFavorite, setUserFavorite] = useState<boolean | null>(null);
  const [userWatchlist, setUserWatchlist] = useState<boolean | null>(null);

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

  const checkUserFavorite = async (filmId: string) => {
    const response = await CheckUserFilmFavorite(filmId);
    setUserFavorite(response);
  };

  const checkUserWatchlist = async (filmId: string) => {
    const response = await CheckUserFilmWatchlist(filmId);
    setUserWatchlist(response);
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
    checkUserFavorite(params.filmId);
    checkUserWatchlist(params.filmId);
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
            <UserFilmFavoriteProvider value={userFavorite}>
              <UserFilmWatchlistProvider value={userWatchlist}>
                <Layout style={{ minHeight: "100dvh" }}>
                  <HeaderLayout />
                  <FilmFound />
                  <FooterLayout />
                  <Toaster richColors position="bottom-right" />
                </Layout>
              </UserFilmWatchlistProvider>
            </UserFilmFavoriteProvider>
          </UserFilmCommentProvider>
        </FilmDataProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
