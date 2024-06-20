import { ForumChildData } from "@/types";
import { Avatar, Card, Col, Flex, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

const { Paragraph, Text } = Typography;

const ForumDetailChildCard: React.FC<{ child: ForumChildData }> = ({
  child,
}) => {
  const title: React.ReactNode = (
    <a
      href={`/user/${child.user.username}
    `}
      style={{ textDecoration: "none" }}
    >
      <Flex vertical={false} justify="flex-start" align="center">
        <Col flex="75px">
          <Avatar
            size={50}
            icon={
              <Image
                priority
                src={child.user.avatar}
                width={2048}
                height={2048}
                alt={`Avatar ${child.user.username}`}
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
              <b style={{ fontWeight: "bold" }}>{child.user.username}</b>
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
                {formatDistanceToNow(new Date(child.createdAt), {
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
          fontSize: 15,
          margin: 0,
        }}
      >
        {child.content}
      </Paragraph>
    </Card>
  );
};

export default ForumDetailChildCard;
