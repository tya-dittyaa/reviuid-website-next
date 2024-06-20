import { ForumParentData } from "@/types";
import { GetForumParentByPage } from "@/utils";
import { Button, Card, Flex, Spin, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ForumTopCard from "./ForumTopCard";

const { Title } = Typography;
const { Meta } = Card;

const ForumTopList: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [forumParent, setForumParent] = useState<ForumParentData[]>([]);

  const getForumParentByPage = async (page: number) => {
    const data = await GetForumParentByPage(page);
    if (data) setForumParent(data);
    else setForumParent([]);
  };

  useEffect(() => {
    getForumParentByPage(1);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  const renderForumParent: React.ReactNode = (
    <Flex
      vertical
      gap={10}
      style={{
        textAlign: "left",
      }}
    >
      {forumParent.map((parent) => (
        <ForumTopCard key={parent.id} parent={parent} />
      ))}
    </Flex>
  );

  if (isLoading) {
    return (
      <Flex vertical gap={10}>
        <Card
          style={{
            background: "#E2E0D8",
            textAlign: "center",
          }}
          styles={{
            body: {
              margin: 0,
              padding: "1rem",
            },
          }}
        >
          <Meta title={<Spin />} />
        </Card>
      </Flex>
    );
  }

  if (forumParent.length < 1) {
    return (
      <Flex vertical gap={10}>
        <Card
          style={{
            background: "#E2E0D8",
            textAlign: "center",
          }}
          styles={{
            body: {
              margin: 0,
              padding: "1rem",
            },
          }}
        >
          <Meta
            title={
              <Title level={5} style={{ color: "gray", margin: 0 }}>
                Tidak ada data
              </Title>
            }
          />
        </Card>
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      gap={10}
      style={{
        background: "#E2E0D8",
        textAlign: "center",
        height: 470,
        padding: "1rem",
        borderRadius: 10,
      }}
    >
      <Card
        bordered={false}
        style={{
          background: "#E2E0D8",
          textAlign: "center",
          maxHeight: 470,
          overflow: "auto",
        }}
        styles={{
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      >
        <Meta title={renderForumParent} />
      </Card>

      <Button
        block
        size="large"
        type="primary"
        style={{
          color: "black",
          position: "sticky",
        }}
        onClick={() => {
          router.push("/forum");
        }}
      >
        Lihat Semua
      </Button>
    </Flex>
  );
};

export default ForumTopList;
