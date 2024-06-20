import { useForumChildTotal, useViewLayout } from "@/context";
import { Pagination } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const ForumChildPageBar: React.FC = () => {
  const layout = useViewLayout();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalForumChild = useForumChildTotal();

  const getPage = searchParams.get("page");

  const [nowPage, setNowPage] = useState<number>(Number(getPage) || 1);

  const onPageChange = (page: number) => {
    window.location.replace(`${pathname}?page=${page}`);
  };

  return (
    <Pagination
      simple
      showSizeChanger={false}
      defaultCurrent={nowPage}
      total={totalForumChild}
      onChange={(page, pageSize) => {
        onPageChange(page);
      }}
      style={{
        borderRadius: 10,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default ForumChildPageBar;
