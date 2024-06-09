import { Flex, Pagination, Typography } from "antd";
import { usePathname } from "next/navigation";

const { Text } = Typography;

const FilmCommentHeader: React.FC<{
  nowPage: number;
  totalPage: number;
}> = ({ nowPage, totalPage }) => {
  const pathname = usePathname();

  if (totalPage === 0) totalPage = 1;

  const updatePage = (page: number) => {
    window.location.replace(`${pathname}?page=${page}`);
  };

  return (
    <Flex vertical={false} align="center" justify="space-between">
      <Text
        strong
        style={{
          color: "#E2B808",
          fontSize: 30,
        }}
      >
        <b style={{ fontWeight: "bold" }}>Komentar</b>
      </Text>

      <Pagination
        simple
        showSizeChanger={false}
        defaultCurrent={nowPage}
        total={totalPage}
        responsive
        onChange={(page: number, pageSize?: number | undefined) => {
          updatePage(page);
        }}
        style={{
          padding: "0.5rem",
          backgroundColor: "#E2B808",
          borderRadius: 10,
          fontWeight: "bold",
        }}
      />
    </Flex>
  );
};

export default FilmCommentHeader;
