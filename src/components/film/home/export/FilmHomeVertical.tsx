import {
  useFilmBroadcastToday,
  useFilmComingSoon,
  useFilmTop10,
  useFilmTopFavorite,
} from "@/context";
import { Flex, Typography } from "antd";
import FilmListCard from "../layout/FilmListCard";
import ForumTopList from "../layout/ForumTopList";

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

const FilmHomeVertical: React.FC = () => {
  const broadcastTodayFilm = useFilmBroadcastToday();
  const top10Film = useFilmTop10();
  const topFavoriteFilm = useFilmTopFavorite();
  const comingSoonFilm = useFilmComingSoon();

  return (
    <Flex vertical gap={30}>
      <Flex vertical gap={10}>
        <CreateTitleName title="Diskusi Forum" />
        <ForumTopList />
      </Flex>

      <Flex vertical gap={10}>
        <CreateTitleName title="Tayang Hari Ini" />
        <FilmListCard film={broadcastTodayFilm} />
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

export default FilmHomeVertical;
