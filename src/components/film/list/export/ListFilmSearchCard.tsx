import { useViewLayout } from "@/context";
import { FilmData } from "@/types";
import { GetFilmListBySearch } from "@/utils";
import { Col, Flex, Image, Rate, Spin, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

const NotFound: React.FC = () => {
  return (
    <Flex
      vertical={true}
      align="center"
      justify="center"
      style={{
        width: "100%",
        backgroundColor: "#E2E0D8",
        padding: "1rem",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Title
        level={4}
        style={{
          color: "gray",
          margin: "0",
          padding: "1rem",
        }}
      >
        Film yang dicari tidak ditemukan
      </Title>
    </Flex>
  );
};

const Blank: React.FC = () => {
  return (
    <Flex
      vertical={true}
      align="center"
      justify="center"
      style={{
        width: "50%",
        padding: "1rem",
        borderRadius: 20,
      }}
    >
      <div></div>
    </Flex>
  );
};

const Found: React.FC<{ filmData: FilmData }> = ({ filmData }) => {
  const layout = useViewLayout();

  return (
    <Flex
      vertical={true}
      align="flex-start"
      justify="flex-start"
      style={{
        width: "100%",
        backgroundColor: "#E2E0D8",
        padding: "1rem",
        borderRadius: 20,
      }}
    >
      <Flex vertical={false} gap={40} style={{ width: "100%" }}>
        <Col
          flex="100px"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Image
            width={100}
            height={160}
            src={filmData.poster}
            alt="Film Poster"
            style={{
              borderRadius: 15,
            }}
          />
        </Col>

        <Col
          flex="auto"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Flex vertical={true} gap={layout === "horizontal" ? 20 : 15}>
            <Title
              level={layout === "horizontal" ? 3 : 4}
              style={{ margin: 0 }}
            >
              {filmData.title}
            </Title>
            <Rate
              disabled
              allowHalf
              defaultValue={filmData.rating}
              style={{ fontSize: layout === "horizontal" ? 25 : 20 }}
            />
          </Flex>
        </Col>
      </Flex>
    </Flex>
  );
};

const ListFilmSearchCard: React.FC = () => {
  const layout = useViewLayout();
  const searchParams = useSearchParams();

  const getSearch = searchParams.get("search");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filmData, setFilmData] = useState<FilmData[]>([]);

  const getFilmData = async (search: string | null) => {
    if (!search) return setFilmData([]);

    const response = await GetFilmListBySearch(search);
    if (response) setFilmData(response);
    else setFilmData([]);

    setIsLoading(false);
  };

  useEffect(() => {
    getFilmData(getSearch);
  }, [getSearch]);

  if (isLoading) {
    return <Spin />;
  }

  if (filmData.length === 0) {
    return <NotFound />;
  }

  return (
    <Flex vertical={true} gap={15} style={{ width: "100%" }}>
      {layout === "horizontal"
        ? filmData.map((film, index) =>
            index % 2 === 0 ? (
              <React.Fragment key={index}>
                <Flex vertical={false} gap={15} style={{ width: "100%" }}>
                  <a href={`/film/${film.id}`} style={{ width: "50%" }}>
                    <Found filmData={film} />
                  </a>
                  {filmData[index + 1] ? (
                    <a
                      href={`/film/${filmData[index + 1].id}`}
                      style={{ width: "50%" }}
                    >
                      <Found filmData={filmData[index + 1]} key={index + 1} />
                    </a>
                  ) : (
                    <Blank key={index + 1} />
                  )}
                </Flex>
              </React.Fragment>
            ) : (
              <React.Fragment key={index}></React.Fragment>
            )
          )
        : filmData.map((film, index) => (
            <a href={`/film/${film.id}`} key={index} style={{ width: "100%" }}>
              <Found filmData={film} />
            </a>
          ))}
    </Flex>
  );
};

export default ListFilmSearchCard;
