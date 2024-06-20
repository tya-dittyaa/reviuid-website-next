import { useViewLayout } from "@/context";
import { Avatar, Col, Flex, Typography } from "antd";

const { Title } = Typography;

interface HeaderWithIconProps {
  icon: React.ReactNode;
  title: string;
}

const TitleLayout: React.FC<HeaderWithIconProps> = ({ icon, title }) => {
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
          icon={icon}
          style={{
            backgroundColor: "#E2B808",
            color: "black",
            marginRight: "1rem",
          }}
        />

        <Title
          level={layout === "horizontal" ? 2 : 3}
          style={{
            color: "#E2B808",
            margin: 0,
          }}
        >
          {title}
        </Title>
      </Col>
    </Flex>
  );
};

export default TitleLayout;
