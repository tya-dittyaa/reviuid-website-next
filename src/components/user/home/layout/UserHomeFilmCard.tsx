import { FilmData } from "@/types";
import { Card, Image } from "antd";
import { useRouter } from "next/navigation";

const { Meta } = Card;

const UserHomeFilmCard: React.FC<{ film: FilmData }> = ({ film }) => {
  const router = useRouter();

  return (
    <Card
      hoverable
      style={{
        width: 250,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        textAlign: "center",
      }}
      cover={
        <Image
          width={250}
          height={375}
          preview={false}
          alt={`Poster ${film.title}`}
          src={film.poster}
        />
      }
      onClick={() => {
        router.push(`/film/${film.id}`);
      }}
    >
      <Meta title={film.title} />
    </Card>
  );
};

export default UserHomeFilmCard;
