import { useViewLayout } from "@/context";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { useSearchParams } from "next/navigation";

const { Search } = Input;

const ForumListSearchBar: React.FC = () => {
  const layout = useViewLayout();
  const searchParams = useSearchParams();
  const getSearch = searchParams.get("search");

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    switch (info?.source) {
      case "input":
        window.location.replace(`/forum?search=${value}`);
        break;
    }
  };

  return (
    <Search
      allowClear
      enterButton
      size="large"
      placeholder="Cari forum..."
      onSearch={onSearch}
      defaultValue={getSearch ? getSearch : undefined}
      style={{
        width: layout === "horizontal" ? "50%" : "100%",
      }}
    />
  );
};

export default ForumListSearchBar;
