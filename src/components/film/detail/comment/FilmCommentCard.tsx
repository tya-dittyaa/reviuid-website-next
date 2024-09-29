import { useFilmData } from "@/context";
import { FilmReviewData } from "@/types";
import { GetFilmCommentByPage } from "@/utils";
import { Avatar, Card, Col, Flex, Rate, Spin, Typography } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FilmCommentDropdown from "./FilmCommentDropdown";

const { Title, Paragraph, Text } = Typography;

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
        Belum ada komentar
      </Title>
    </Flex>
  );
};

const Found: React.FC<{ reviewData: FilmReviewData }> = ({ reviewData }) => {
  const title: React.ReactNode = (
    <a
      href={`/user/${reviewData.user.username}`}
      style={{ textDecoration: "none" }}
    >
      <Flex vertical={false} justify="flex-start" align="center">
        <Col flex="75px">
          <Avatar
            size={50}
            icon={
              <Image
                priority
                src={reviewData.user.avatar}
                width={2048}
                height={2048}
                alt={`Avatar ${reviewData.user.username}`}
              />
            }
            style={{
              borderColor: "black",
              borderWidth: 2,
              borderStyle: "solid",
            }}
          />
        </Col>
        <Col flex="auto">
          <Flex vertical gap={5} justify="center" align="flex-start">
            <Text strong style={{ color: "black", fontSize: 17 }}>
              <b style={{ fontWeight: "bold" }}>{reviewData.user.username}</b>
            </Text>
            <Flex gap={15} justify="center" align="center">
              <Rate
                disabled
                defaultValue={reviewData.rating}
                style={{ margin: 0, fontSize: 14 }}
              />
              <Text
                style={{
                  color: "black",
                  fontSize: 12,
                  fontWeight: "lighter",
                  margin: 0,
                }}
              >
                {new Date(reviewData.updatedAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </Text>
            </Flex>
          </Flex>
        </Col>
      </Flex>
    </a>
  );

  return (
    <Card
      title={title}
      style={{ width: "100%", backgroundColor: "#E2E0D8" }}
      styles={{
        header: {
          margin: 0,
          padding: "1rem",
        },
        body: {
          margin: 0,
          padding: "1rem",
        },
      }}
      extra={<FilmCommentDropdown reviewData={reviewData} />}
    >
      <Paragraph
        style={{
          color: "black",
          fontSize: 16,
          margin: 0,
        }}
      >
        {reviewData.review}
      </Paragraph>
    </Card>
  );
};

const FilmCommentCard: React.FC<{
  nowPage: number;
  totalPage: number;
}> = ({ nowPage, totalPage }) => {
  const filmData = useFilmData()!;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<FilmReviewData[] | null>(null);

  const getReviewData = async (filmId: string, nowPage: number) => {
    const response = await GetFilmCommentByPage(filmId, nowPage);
    setReviewData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getReviewData(filmData.id, nowPage);
  }, [filmData.id, nowPage]);

  if (isLoading) {
    return <Spin />;
  }

  if (totalPage === 0 || reviewData === null || reviewData.length === 0) {
    return <NotFound />;
  }

  return (
    <Flex vertical gap={15} style={{ width: "100%" }}>
      {reviewData.map((review, index) => (
        <Found key={index} reviewData={review} />
      ))}
    </Flex>
  );
};

export default FilmCommentCard;
