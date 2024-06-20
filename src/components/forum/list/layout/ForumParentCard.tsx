import { ForumListParentData } from "@/types";
import { Avatar, Card, Col, Flex, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

const { Paragraph, Text } = Typography;

const ForumParentCard: React.FC<{ parent: ForumListParentData }> = ({
  parent,
}) => {
  const title: React.ReactNode = (
    <a href={`/forum/${parent.id}`} style={{ textDecoration: "none" }}>
      <Flex vertical={false} justify="flex-start" align="center">
        <Col flex="75px">
          <Avatar
            size={50}
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
            <Text strong style={{ color: "black", fontSize: 17 }}>
              <b style={{ fontWeight: "bold" }}>{parent.user.username}</b>
            </Text>
            <Flex gap={15} justify="center" align="center">
              <Text
                style={{
                  color: "black",
                  fontSize: 12,
                  fontWeight: "lighter",
                  margin: 0,
                }}
              >
                {formatDistanceToNow(new Date(parent.createdAt), {
                  addSuffix: true,
                  locale: id,
                })}
              </Text>
            </Flex>
          </Flex>
        </Col>
      </Flex>
    </a>
  );

  return (
    <Card
      title={title}
      style={{ width: "100%", backgroundColor: "#E2E0D8" }}
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
          fontSize: 16,
          margin: 0,
        }}
      >
        {parent.title}
      </Paragraph>
    </Card>
  );
};

export default ForumParentCard;
