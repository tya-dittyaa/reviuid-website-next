import {
  useUserFilmFavoriteTotal,
  useUserFilmWatchlistTotal,
  useUserProfile,
} from "@/context";
import { FilmData } from "@/types";
import { GetUserFilmFavoriteByPage, GetUserFilmWatchlistByPage } from "@/utils";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Card, Flex, Pagination, TabsProps, Typography } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserHomeFilmCard from "../layout/UserHomeFilmCard";

const { Title } = Typography;

const UserHomeTabs: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const user = useUserProfile()!;
  const totalFavorite = useUserFilmFavoriteTotal();
  const totalWatchlist = useUserFilmWatchlistTotal();

  const getTab = searchParams.get("tab");
  const getPage = searchParams.get("page");
  const page = getPage ? parseInt(getPage) : 1;

  const [filmFavorite, setFilmFavorite] = useState<FilmData[]>([]);
  const [filmWatchlist, setFilmWatchlist] = useState<FilmData[]>([]);

  const getFilmFavorite = async (username: string, page: number) => {
    const data = await GetUserFilmFavoriteByPage(username, page);
    if (data) setFilmFavorite(data);
    else setFilmFavorite([]);
  };

  const getFilmWatchlist = async (username: string, page: number) => {
    const data = await GetUserFilmWatchlistByPage(username, page);
    if (data) setFilmWatchlist(data);
    else setFilmWatchlist([]);
  };

  useEffect(() => {
    if (getTab === "1") {
      getFilmFavorite(user.username, page);
    } else if (getTab === "2") {
      getFilmWatchlist(user.username, page);
    }
  }, [getTab, page, user.username]);

  const onChange = (key: string) => {
    window.location.replace(`${pathname}?tab=${key}`);
  };

  const onPageChange = (page: number) => {
    window.location.replace(`${pathname}?tab=${getTab}&page=${page}`);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      icon: <SmileOutlined />,
      label: "Daftar Favorit",
    },
    {
      key: "2",
      icon: <EyeOutlined />,
      label: "Daftar Tontonan",
    },
  ];

  return (
    <Card
      style={{ width: "100%", backgroundColor: "#E2E0D8" }}
      tabList={items}
      defaultActiveTabKey={getTab || "1"}
      onTabChange={onChange}
    >
      <Flex vertical gap={30} justify="center" align="center">
        {getTab === "1" ? (
          totalFavorite > 0 ? (
            <Flex
              wrap
              gap={25}
              justify="center"
              align="center"
              style={{ width: "100%" }}
            >
              {filmFavorite.map((film, index) => (
                <UserHomeFilmCard key={index} film={film} />
              ))}
            </Flex>
          ) : (
            <Flex justify="center" align="center">
              <Title level={5} style={{ color: "gray", margin: 0 }}>
                Tidak ada data.
              </Title>
            </Flex>
          )
        ) : totalWatchlist > 0 ? (
          <Flex
            wrap
            gap={25}
            justify="center"
            align="center"
            style={{ width: "100%" }}
          >
            {filmWatchlist.map((film, index) => (
              <UserHomeFilmCard key={index} film={film} />
            ))}
          </Flex>
        ) : (
          <Flex justify="center" align="center">
            <Title level={5} style={{ color: "gray", margin: 0 }}>
              Tidak ada data.
            </Title>
          </Flex>
        )}

        <Pagination
          simple
          showSizeChanger={false}
          defaultCurrent={page}
          total={
            getTab === "1"
              ? totalFavorite > 0
                ? totalFavorite
                : 1
              : totalWatchlist > 0
              ? totalWatchlist
              : 1
          }
          responsive
          onChange={(page, pageSize) => {
            onPageChange(page);
          }}
          style={{
            borderRadius: 10,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Flex>
    </Card>
  );
};

export default UserHomeTabs;
