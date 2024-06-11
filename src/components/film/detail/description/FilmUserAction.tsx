import { Flex } from "antd";
import React from "react";
import AddReview from "../action/UserAddReview";
import AddToFavorites from "../action/UserAddToFavorites";
import AddToWatchlist from "../action/UserAddToWatchlist";

const FilmUserAction: React.FC = () => {
  return (
    <Flex
      vertical
      gap={10}
      align="center"
      justify="center"
      style={{
        width: "100%",
        backgroundColor: "#E2E0D8",
        padding: "1rem",
        borderRadius: 20,
      }}
    >
      <AddReview />
      <AddToFavorites />
      <AddToWatchlist />
    </Flex>
  );
};

export default FilmUserAction;
