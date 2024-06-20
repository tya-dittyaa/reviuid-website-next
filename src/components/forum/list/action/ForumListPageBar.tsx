import { useForumParentTotal, useViewLayout } from "@/context";
import { Pagination } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ForumListPageBar: React.FC = () => {
  const layout = useViewLayout();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalForumParent = useForumParentTotal();

  const getPage = searchParams.get("page");
  const getSearch = searchParams.get("search");

  const [nowPage, setNowPage] = useState<number>(Number(getPage) || 1);
  const [finalForumTotal, setFinalForumTotal] =
    useState<number>(totalForumParent);

  useEffect(() => {
    if (getSearch) {
      console.log("getSearch", getSearch);
      setNowPage(1);
      setFinalForumTotal(1);
    }
  }, [getSearch]);

  const onPageChange = (page: number) => {
    window.location.replace(`${pathname}?page=${page}`);
  };

  return (
    <Pagination
      simple
      responsive
      showSizeChanger={false}
      defaultCurrent={nowPage}
      total={finalForumTotal}
      onChange={(page, pageSize) => {
        onPageChange(page);
      }}
      style={{
        width: layout === "horizontal" ? "auto" : "100%",
        padding: "0.3rem",
        backgroundColor: "#E2B808",
        borderRadius: 10,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default ForumListPageBar;
