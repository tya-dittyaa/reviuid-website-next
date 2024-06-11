import { useViewLayout } from "@/context";
import { Flex } from "antd";
import FilmPoster from "../description/FilmPoster";
import FilmRating from "../description/FilmRating";
import FilmSynopsis from "../description/FilmSynopsis";
import FilmTrailer from "../description/FilmTrailer";
import FilmUserAction from "../description/FilmUserAction";

const Horizontal: React.FC = () => {
  return (
    <Flex gap={10} vertical>
      <Flex gap={10} vertical={false} style={{ width: "100%" }}>
        <FilmPoster />
        <FilmTrailer />
      </Flex>
      <Flex gap={10} vertical={false} style={{ width: "100%" }}>
        <Flex gap={10} vertical style={{ width: "30%" }}>
          <FilmRating />
          <FilmUserAction />
        </Flex>
        <FilmSynopsis />
      </Flex>
    </Flex>
  );
};

const Vertical: React.FC = () => {
  return (
    <Flex gap={10} vertical>
      <FilmPoster />
      <FilmTrailer />
      <FilmSynopsis  />
      <FilmRating />
      <FilmUserAction />
    </Flex>
  );
};

const FilmDescription: React.FC = () => {
  const layout = useViewLayout();

  return layout === "horizontal" ? <Horizontal /> : <Vertical />;
};

export default FilmDescription;
