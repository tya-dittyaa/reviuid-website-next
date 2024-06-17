import { useViewLayout } from "@/context";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Flex, Typography } from "antd";

const { Title } = Typography;

const UserHomeHeader: React.FC = () => {
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
          icon={<UserOutlined />}
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
          Profil Pengguna
        </Title>
      </Col>
    </Flex>
  );
};

export default UserHomeHeader;
