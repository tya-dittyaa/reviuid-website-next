import { useFilmTotal, useViewLayout } from "@/context";
import { FilmData } from "@/types";
import { GetFilmListByPage } from "@/utils";
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
        Belum ada film
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
        width: "100%",
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

const ListFilmPageCard: React.FC = () => {
  const layout = useViewLayout();
  const searchParams = useSearchParams();
  const totalFilm = useFilmTotal();

  const getPage = searchParams.get("page");
  const page = Number(getPage) || 1;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filmData, setFilmData] = useState<FilmData[]>([]);

  const getFilmData = async (page: number) => {
    const response = await GetFilmListByPage(page);
    if (response) setFilmData(response);
    else setFilmData([]);
    setIsLoading(false);
  };

  useEffect(() => {
    getFilmData(page);
  }, [page]);

  if (isLoading) {
    return <Spin />;
  }

  if (totalFilm === 0 || filmData.length === 0) {
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

export default ListFilmPageCard;
