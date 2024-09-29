import { useViewLayout } from "@/context";
import { Flex } from "antd";
import React from "react";
import ListFilmPageBar from "../action/ListFilmPageBar";
import ListFilmSearchBar from "../action/ListFilmSearchBar";

const ListFilmSearchAndPage: React.FC = () => {
  const layout = useViewLayout();

  return (
    <Flex
      vertical={layout === "horizontal" ? false : true}
      gap={15}
      content="center"
      justify="space-between"
      style={{ marginBottom: "20px" }}
    >
      <ListFilmSearchBar />
      <ListFilmPageBar />
    </Flex>
  );
};

export default ListFilmSearchAndPage;
