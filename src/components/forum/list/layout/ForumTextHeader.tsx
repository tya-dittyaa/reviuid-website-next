import { useViewLayout } from "@/context";
import { VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Col, Flex, Typography } from "antd";

const { Title } = Typography;

const ForumTextHeader: React.FC = () => {
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

        <Title
          level={2}
          style={{
            color: "#E2B808",
            margin: 0,
          }}
        >
          Forum Diskusi
        </Title>
      </Col>
    </Flex>
  );
};

export default ForumTextHeader;
