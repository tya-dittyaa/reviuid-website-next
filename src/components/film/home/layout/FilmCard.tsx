import { FilmData } from "@/types";
import { Card, Image } from "antd";
import { useRouter } from "next/navigation";

const { Meta } = Card;

const FilmCard: React.FC<{ film: FilmData }> = ({ film }) => {
  const router = useRouter();

  return (
    <div
      style={{
        padding: "3px 3px",
      }}
    >
      <Card
        hoverable
        style={{
          textAlign: "center",
          background: "#E2E0D8",
        }}
        onClick={() => {
          router.push(`/film/${film.id}`);
        }}
        cover={
          <Image
            preview={false}
            alt={`${film.title} poster`}
            src={film.poster}
            style={{ width: "100%", height: 400, objectFit: "cover" }}
          />
        }
      >
        <Meta title={film.title} />
      </Card>
    </div>
  );
};

export default FilmCard;
