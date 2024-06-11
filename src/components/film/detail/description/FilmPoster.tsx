import { useFilmData, useViewLayout } from "@/context";
import { Flex, Image, Typography } from "antd";

const { Title } = Typography;

const FilmPoster: React.FC = () => {
  const layout = useViewLayout();
  const filmData = useFilmData()!;

  return (
    <Flex
      vertical={true}
      align="center"
      justify="center"
      gap={15}
      style={{
        width: layout === "horizontal" ? "30%" : "auto",
        textAlign: "center",
        backgroundColor: "#E2E0D8",
        padding: "1rem",
        borderRadius: 20,
      }}
    >
      <Title
        level={3}
        style={{
          color: "black",
          margin: "0",
        }}
      >
        {filmData.title}
      </Title>
      <Image
        width="100%"
        height="auto"
        src={filmData.poster}
        alt="Film Poster"
        style={{
          borderRadius: 20,
        }}
      />
    </Flex>
  );
};

export default FilmPoster;
