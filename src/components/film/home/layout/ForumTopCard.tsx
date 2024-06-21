import { ForumParentData } from "@/types";
import { Avatar, Card, Col, Flex, Typography } from "antd";
import Image from "next/image";

const { Paragraph, Text } = Typography;

const ForumTopCard: React.FC<{ parent: ForumParentData }> = ({ parent }) => {
  const title: React.ReactNode = (
    <Flex vertical={false} justify="flex-start" align="center">
      <Col flex="55px">
        <Avatar
          size={35}
          icon={
            <Image
              priority
              src={parent.user.avatar}
              width={2048}
              height={2048}
              alt={`Avatar ${parent.user.username}`}
            />
          }
          style={{
            borderColor: "black",
            borderWidth: 2,
            borderStyle: "solid",
          }}
        />
      </Col>
      <Col flex="auto">
        <Flex vertical gap={5} justify="center" align="flex-start">
          <Text strong style={{ color: "black", fontSize: 15 }}>
            <b style={{ fontWeight: "bold" }}>{parent.user.username}</b>
          </Text>
        </Flex>
      </Col>
    </Flex>
  );

  return (
    <a href={`/forum/${parent.id}`} style={{ textDecoration: "none" }}>
      <Card
        title={title}
        style={{ width: "100%", backgroundColor: "whitesmoke" }}
        styles={{
          header: {
            margin: 0,
            padding: "1rem",
          },
          body: {
            margin: 0,
            padding: "1rem",
          },
        }}
      >
        <Paragraph
          style={{
            color: "black",
            fontSize: 14,
            margin: 0,
          }}
        >
          {parent.title}
        </Paragraph>
      </Card>
    </a>
  );
};

export default ForumTopCard;
