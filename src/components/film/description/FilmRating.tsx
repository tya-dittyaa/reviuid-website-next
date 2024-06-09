import { useFilmData, useViewLayout } from "@/context";
import { Col, Flex, Rate, Typography } from "antd";

const { Text } = Typography;

const FilmRating: React.FC = () => {
  const layout = useViewLayout();
  const filmData = useFilmData()!;

  return (
    <Flex
      vertical={true}
      align="center"
      justify="center"
      style={{
        textAlign: "center",
        backgroundColor: "#E2E0D8",
        padding: "1rem",
        borderRadius: 20,
      }}
    >
      <Flex
        vertical={false}
        align="center"
        justify="center"
        style={{
          width: "100%",
          backgroundColor: "#E2E0D8",
          borderRadius: 20,
        }}
      >
        <Col
          flex={layout === "horizontal" ? "100px" : "auto"}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "#E2B808",
            borderRadius: "10px 0 0 10px",
          }}
        >
          <Text
            style={{
              color: "black",
              margin: 0,
              fontSize: 30,
              padding: "0.5rem",
            }}
          >
            {filmData.rating.toFixed(1)}
          </Text>
        </Col>

        <Col
          flex="auto"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "#272626",
            borderRadius: "0 10px 10px 0",
          }}
        >
          <Rate
            disabled
            defaultValue={filmData.rating}
            style={{
              fontSize: 30,
              padding: "1rem",
            }}
          />
        </Col>
      </Flex>
    </Flex>
  );
};

export default FilmRating;
