import { ForumListParentData } from "@/types";
import { GetForumParentByPage, GetForumParentBySearch } from "@/utils";
import { Flex } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ForumParentCard from "./ForumParentCard";
import ForumParentLoadingCard from "./ForumParentLoadingCard";
import ForumParentNoDataCard from "./ForumParentNoDataCard";

const ForumParentList: React.FC = () => {
  const searchParams = useSearchParams();

  const getPage = searchParams.get("page");
  const getSearch = searchParams.get("search");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [forumParent, setForumParent] = useState<ForumListParentData[]>([]);

  const getForumParentByPage = async (page: number) => {
    const data = await GetForumParentByPage(page);
    if (data) setForumParent(data);
    else setForumParent([]);
  };

  const getForumParentBySearch = async (search: string) => {
    const data = await GetForumParentBySearch(search);
    if (data) setForumParent(data);
    else setForumParent([]);
  };

  useEffect(() => {
    if (getSearch) {
      getForumParentBySearch(getSearch);
    } else {
      getForumParentByPage(Number(getPage) || 1);
    }
  }, [getSearch, getPage]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) return <ForumParentLoadingCard />;

  return (
    <Flex vertical gap={20}>
      {forumParent.length < 1 ? (
        <ForumParentNoDataCard />
      ) : (
        forumParent.map((parent) => (
          <ForumParentCard key={parent.id} parent={parent} />
        ))
      )}
    </Flex>
  );
};

export default ForumParentList;
