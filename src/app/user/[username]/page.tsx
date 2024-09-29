"use client";

import {
  DividerCenter,
  FooterLayout,
  HeaderLayout,
  TitleLayout,
  UserHomeHorizontal,
  UserHomeTabs,
  UserHomeVertical,
} from "@/components";
import {
  UserFilmFavoriteTotalProvider,
  UserFilmWatchlistTotalProvider,
  UserProfileProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useUserFilmFavoriteTotal,
  useUserFilmWatchlistTotal,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserProfile, UserSession } from "@/types";
import {
  GetUserFilmFavoriteTotal,
  GetUserFilmWatchlistTotal,
  GetUserProfile,
  GetUserSession,
} from "@/utils";
import { UserOutlined } from "@ant-design/icons";
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

function BodyLayout() {
  const layout = useViewLayout();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalFavorite = useUserFilmFavoriteTotal();
  const totalWatchlist = useUserFilmWatchlistTotal();

  const getTab = searchParams.get("tab");
  const getPage = searchParams.get("page");

  const totalPageFavorite = Math.ceil(totalFavorite / 10);
  const totalPageWatchlist = Math.ceil(totalWatchlist / 10);

  useEffect(() => {
    if (!getTab || parseInt(getTab) < 1 || parseInt(getTab) > 2) {
      router.push(`${pathname}?tab=1`);
    } else if (
      getTab === "1" &&
      (!getPage ||
        parseInt(getPage) < 1 ||
        parseInt(getPage) > totalPageFavorite)
    ) {
      router.push(`${pathname}?tab=1&page=1`);
    } else if (
      getTab === "2" &&
      (!getPage ||
        parseInt(getPage) < 1 ||
        parseInt(getPage) > totalPageWatchlist)
    ) {
      router.push(`${pathname}?tab=2&page=1`);
    }
  }, [
    getPage,
    getTab,
    pathname,
    router,
    totalPageFavorite,
    totalPageWatchlist,
  ]);

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
      <TitleLayout icon={<UserOutlined />} title="Profil Pengguna" />
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
  const [totalFavorite, setTotalFavorite] = useState<number>(0);
  const [totalWatchlist, setTotalWatchlist] = useState<number>(0);

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

  const getTotalFavorite = async (username: string) => {
    const response = await GetUserFilmFavoriteTotal(username);
    if (response) setTotalFavorite(response);
    else setTotalFavorite(0);
  };

  const getTotalWatchlist = async (username: string) => {
    const response = await GetUserFilmWatchlistTotal(username);
    if (response) setTotalWatchlist(response);
    else setTotalWatchlist(0);
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
    getUserProfile(params.username);
    getTotalFavorite(params.username);
    getTotalWatchlist(params.username);
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
          <UserFilmFavoriteTotalProvider total={totalFavorite}>
            <UserFilmWatchlistTotalProvider total={totalWatchlist}>
              <Layout style={{ minHeight: "100dvh" }}>
                <HeaderLayout />
                <BodyLayout />
                <FooterLayout />
                <Toaster richColors position="bottom-right" />
              </Layout>
            </UserFilmWatchlistTotalProvider>
          </UserFilmFavoriteTotalProvider>
        </UserProfileProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
