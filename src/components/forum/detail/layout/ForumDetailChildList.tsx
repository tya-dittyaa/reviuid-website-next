import { useForumParentData } from "@/context";
import { ForumChildData } from "@/types";
import { GetForumChildByPage } from "@/utils";
import { Card, Flex } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ForumDetailChildLoadingCard from "../../list/layout/ForumParentLoadingCard";
import ForumDetailChildCard from "./ForumChildCard";
import ForumChildNoDataCard from "./ForumChildNoDataCard";
import ForumChildPageBar from "../action/ForumChildPageBar";

const ForumDetailChildList: React.FC = () => {
  const searchParams = useSearchParams();
  const parent = useForumParentData()!;

  const getPage = searchParams.get("page");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [forumChild, setForumChild] = useState<ForumChildData[]>([]);

  const getForumChildByPage = async (parentId: string, page: number) => {
    const data = await GetForumChildByPage(parentId, page);
    if (data) setForumChild(data);
    else setForumChild([]);
  };

  useEffect(() => {
    getForumChildByPage(parent.id, Number(getPage) || 1);
  }, [getPage, parent.id]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) return <ForumDetailChildLoadingCard />;

  if (forumChild.length < 1) return <ForumChildNoDataCard />;

  return (
    <Card
      style={{ width: "100%", backgroundColor: "#E2E0D8" }}
      styles={{
        body: {
          margin: 0,
          padding: "1rem",
        },
      }}
    >
      <Flex vertical gap={20}>
        {forumChild.map((child) => (
          <ForumDetailChildCard key={child.id} child={child} />
        ))}

        <ForumChildPageBar />
      </Flex>
    </Card>
  );
};

export default ForumDetailChildList;
