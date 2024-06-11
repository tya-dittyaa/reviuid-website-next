import { useFilmTotal } from "@/context";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const ListFilmPageBar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filmTotal = useFilmTotal();

  const getPage = searchParams.get("page");
  const getSearch = searchParams.get("search");
  const totalPage = Math.ceil(filmTotal / 10);

  const [nowPage, setNowPage] = React.useState<number>(Number(getPage) || 1);
  const [finalFilmTotal, setFinalFilmTotal] = React.useState<number>(filmTotal);

  useEffect(() => {
    if (getSearch) {
      setNowPage(1);
      setFinalFilmTotal(1);
    }
  }, [getSearch]);

  const onPageChange = (page: number) => {
    window.location.replace(`${pathname}?page=${page}`);
  };

  return (
    <Pagination
      simple
      showSizeChanger={false}
      defaultCurrent={nowPage}
      total={finalFilmTotal}
      responsive
      onChange={(page, pageSize) => {
        onPageChange(page);
      }}
      style={{
        padding: "0.5rem",
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

export default ListFilmPageBar;
