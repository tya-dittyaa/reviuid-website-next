import { Card, Flex, Spin, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;
const { Meta } = Card;

const ForumChatTopList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  return (
    <Flex vertical gap={10}>
      <Card
        style={{
          background: "#E2E0D8",
          textAlign: "center",
        }}
      >
        <Meta
          title={
            isLoading ? (
              <Spin />
            ) : (
              <Title level={5} style={{ color: "gray", margin: 0 }}>
                Belum ada diskusi
              </Title>
            )
          }
        />
      </Card>
    </Flex>
  );
};

export default ForumChatTopList;
