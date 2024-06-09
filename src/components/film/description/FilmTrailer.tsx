import { useFilmData, useViewLayout } from "@/context";
import { Flex, Typography } from "antd";

const { Title } = Typography;

function translateLinkYTtoEmbed(link: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = link.match(regExp);
  const result = match && match[2].length === 11 ? match[2] : null;

  if (result) {
    return `https://www.youtube.com/embed/${result}`;
  }

  return `https://www.youtube.com/embed/DB68T2s7gfI`;
}

const FilmTrailer: React.FC = () => {
  const layout = useViewLayout();
  const filmData = useFilmData()!;

  return (
    <Flex
      vertical={true}
      align={layout === "horizontal" ? "flex-start" : "center"}
      justify="center"
      gap={15}
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
          margin: "0",
        }}
      >
        Cuplikan Film
      </Title>

      <iframe
        width="741"
        height="360"
        src={translateLinkYTtoEmbed(filmData.trailer)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 20,
        }}
      />
    </Flex>
  );
};

export default FilmTrailer;
