import { Flex, Pagination, Typography } from "antd";

const { Text } = Typography;

const FilmCommentHeader: React.FC<{
  nowPage: number;
  totalPage: number;
}> = ({ nowPage, totalPage }) => {
  if (totalPage === 0) totalPage = 1;

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
        defaultCurrent={nowPage}
        total={totalPage}
        responsive
        style={{
          padding: "0.5rem",
          backgroundColor: "#E2B808",
          borderRadius: 20,
          fontWeight: "bold",
        }}
      />
    </Flex>
  );
};

export default FilmCommentHeader;
