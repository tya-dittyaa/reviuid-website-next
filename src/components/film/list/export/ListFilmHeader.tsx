import { useViewLayout } from "@/context";
import { VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Col, Flex, Typography } from "antd";

const { Text } = Typography;

const ListFilmHeader: React.FC = () => {
  const layout = useViewLayout();

  return (
    <Flex vertical style={{ width: "100%" }}>
      <Col
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Avatar
          size={layout === "horizontal" ? "large" : "default"}
          icon={<VideoCameraOutlined />}
          style={{
            backgroundColor: "#E2B808",
            color: "black",
            marginRight: "1rem",
          }}
        />

        <Text
          strong
          style={{
            color: "#E2B808",
            fontSize: 30,
          }}
        >
          <b style={{ fontWeight: "bold" }}>Daftar Film</b>
        </Text>
      </Col>
    </Flex>
  );
};

export default ListFilmHeader;
