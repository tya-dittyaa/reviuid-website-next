"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { FilmHomeHorizontal, FilmHomeVertical } from "@/components/film/home";
import {
  FilmBroadcastTodayProvider,
  FilmComingSoonProvider,
  FilmTop10Provider,
  FilmTopFavoriteProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { FilmData, UserSession } from "@/types";
import {
  GetFilmBroadcastToday,
  GetFilmComingSoon,
  GetFilmTop10,
  GetFilmTopFavorite,
  GetUserSession,
} from "@/utils";
import "@fontsource/poppins";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const { Content } = Layout;

function ContentLayout() {
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
      {layout === "vertical" ? <FilmHomeVertical /> : <FilmHomeHorizontal />}
    </Content>
  );
}

export default function Home() {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [broadcastTodayFilm, setBroadcastTodayFilm] = useState<
    FilmData[] | null
  >(null);
  const [top10Film, setTop10Film] = useState<FilmData[] | null>(null);
  const [topFavoriteFilm, setTopFavoriteFilm] = useState<FilmData[] | null>(
    null
  );
  const [comingSoonFilm, setComingSoonFilm] = useState<FilmData[] | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
    setIsLoading(false);
  };

  const getBroadcastTodayFilm = async () => {
    const film = await GetFilmBroadcastToday();
    setBroadcastTodayFilm(film);
  };

  const getTop10Film = async () => {
    const film = await GetFilmTop10();
    setTop10Film(film);
  };

  const getTopFavoriteFilm = async () => {
    const film = await GetFilmTopFavorite();
    setTopFavoriteFilm(film);
  };

  const getComingSoonFilm = async () => {
    const film = await GetFilmComingSoon();
    setComingSoonFilm(film);
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
    getBroadcastTodayFilm();
    getTop10Film();
    getTopFavoriteFilm();
    getComingSoonFilm();
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
        <FilmBroadcastTodayProvider film={broadcastTodayFilm}>
          <FilmTop10Provider film={top10Film}>
            <FilmTopFavoriteProvider film={topFavoriteFilm}>
              <FilmComingSoonProvider film={comingSoonFilm}>
                <Layout style={{ minHeight: "100dvh" }}>
                  <HeaderLayout />
                  <ContentLayout />
                  <FooterLayout />
                </Layout>
              </FilmComingSoonProvider>
            </FilmTopFavoriteProvider>
          </FilmTop10Provider>
        </FilmBroadcastTodayProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
