import { useFilmData } from "@/context";
import { FilmCommentData } from "@/types";
import { GetFilmCommentByPage } from "@/utils";
import { Avatar, Col, Flex, Rate, Spin, Typography } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

const Found: React.FC<{ reviewData: FilmCommentData }> = ({ reviewData }) => {
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
      <Flex vertical={false} style={{ width: "100%" }}>
        <Col flex="80px">
          <a
            href={`/user/${reviewData.user.username}`}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              size={64}
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
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
              }}
            />
          </a>
        </Col>
        <Col flex="auto">
          <Flex vertical>
            <a
              href={`/user/${reviewData.user.username}`}
              style={{ textDecoration: "none" }}
            >
              <Text strong style={{ color: "black", fontSize: 20 }}>
                <b style={{ fontWeight: "bold" }}>{reviewData.user.username}</b>
              </Text>
            </a>

            <Rate
              disabled
              defaultValue={reviewData.rating}
              style={{ margin: 0, fontSize: 20, marginTop: "5px" }}
            />

            <Paragraph style={{ color: "black", marginTop: "15px" }}>
              {reviewData.review}
            </Paragraph>
          </Flex>
        </Col>
      </Flex>
    </Flex>
  );
};

const FilmCommentCard: React.FC<{
  nowPage: number;
  totalPage: number;
}> = ({ nowPage, totalPage }) => {
  const filmData = useFilmData()!;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<FilmCommentData[] | null>(null);

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
