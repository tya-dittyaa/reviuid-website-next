import { useFilmData } from "@/context";
import { Flex, Spin } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilmCommentCard from "../comment/FilmCommentCard";
import FilmCommentHeader from "../comment/FilmCommentHeader";

const FilmComment: React.FC = () => {
  const filmData = useFilmData()!;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getPage = searchParams.get("page");
  const totalPage = Math.ceil(filmData.totalReviews / 10);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nowPage, setNowPage] = useState<number>(Number(getPage) || 1);

  useEffect(() => {
    if (!getPage || isNaN(Number(getPage))) {
      setNowPage(1);
      router.replace(`${pathname}?page=1`, { scroll: false });
    }

    const page = Number(getPage) || 1;
    if (page > totalPage) {
      if (totalPage === 0) {
        setNowPage(1);
        router.replace(`${pathname}?page=1`, { scroll: false });
      } else {
        setNowPage(totalPage);
        router.replace(`${pathname}?page=${totalPage}`, { scroll: false });
      }
    }
  }, [getPage, totalPage, pathname, router]);

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Flex vertical gap={25} style={{ width: "100%" }}>
      <FilmCommentHeader nowPage={nowPage} totalPage={totalPage} />
      <FilmCommentCard nowPage={nowPage} totalPage={totalPage} />
    </Flex>
  );
};

export default FilmComment;
