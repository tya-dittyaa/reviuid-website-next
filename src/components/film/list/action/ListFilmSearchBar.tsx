import { useViewLayout } from "@/context";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { useSearchParams } from "next/navigation";
import React from "react";

const { Search } = Input;

const ListFilmSearchBar: React.FC = () => {
  const layout = useViewLayout();
  const searchParams = useSearchParams();
  const getSearch = searchParams.get("search");

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    switch (info?.source) {
      case "input":
        window.location.replace(`/film?search=${value}`);
        break;
    }
  };

  return (
    <Search
      placeholder="Cari film..."
      onSearch={onSearch}
      defaultValue={getSearch ? getSearch : undefined}
      allowClear
      enterButton
      size="large"
      style={{
        width: layout === "horizontal" ? 500 : "100%",
      }}
    />
  );
};

export default ListFilmSearchBar;
