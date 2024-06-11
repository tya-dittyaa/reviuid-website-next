import { useFilmData, useViewLayout } from "@/context";
import { Flex, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const FilmSynopsis: React.FC = () => {
  const layout = useViewLayout();
  const filmData = useFilmData()!;

  return (
    <Flex
      vertical
      align={layout === "horizontal" ? "flex-start" : "center"}
      justify="flex-start"
      style={{
        width: layout === "horizontal" ? "70%" : "100%",
        backgroundColor: "#E2E0D8",
        padding: "1rem",
        borderRadius: 20,
      }}
    >
      <Title
        level={3}
        style={{
          color: "black",
        }}
      >
        Sinopsis
      </Title>
      <Paragraph
        style={{
          color: "black",
          margin: 0,
        }}
      >
        {filmData.synopsis}
      </Paragraph>
    </Flex>
  );
};

export default FilmSynopsis;
