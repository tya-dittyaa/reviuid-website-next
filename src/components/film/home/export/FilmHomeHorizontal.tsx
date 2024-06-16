import {
  useFilmBroadcastToday,
  useFilmComingSoon,
  useFilmTop10,
  useFilmTopFavorite,
} from "@/context";
import { Flex, Typography } from "antd";
import FilmListCard from "../layout/FilmListCard";
import ForumChatTopList from "../layout/ForumChatTopList";

const { Title } = Typography;

const CreateTitleName: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Title
      level={3}
      style={{
        color: "#E2B808",
        margin: 0,
      }}
    >
      {title}
    </Title>
  );
};

const FilmHomeHorizontal: React.FC = () => {
  const broadcastTodayFilm = useFilmBroadcastToday();
  const top10Film = useFilmTop10();
  const topFavoriteFilm = useFilmTopFavorite();
  const comingSoonFilm = useFilmComingSoon();

  return (
    <Flex vertical gap={30}>
      <Flex gap={30}>
        <Flex
          vertical
          gap={10}
          style={{
            width: "60%",
          }}
        >
          <CreateTitleName title="Tayang Hari Ini" />
          <FilmListCard film={broadcastTodayFilm} slidesToShow={3} />
        </Flex>

        <Flex
          vertical
          gap={10}
          style={{
            width: "40%",
          }}
        >
          <CreateTitleName title="Diskusi Forum" />
          <ForumChatTopList />
        </Flex>
      </Flex>

      <Flex vertical gap={10}>
        <CreateTitleName title="Film Terpopuler" />
        <FilmListCard film={top10Film} />
      </Flex>

      <Flex vertical gap={10}>
        <CreateTitleName title="Film Terfavorit" />
        <FilmListCard film={topFavoriteFilm} />
      </Flex>

      <Flex vertical gap={10}>
        <CreateTitleName title="Segera Tayang" />
        <FilmListCard film={comingSoonFilm} />
      </Flex>
    </Flex>
  );
};

export default FilmHomeHorizontal;
