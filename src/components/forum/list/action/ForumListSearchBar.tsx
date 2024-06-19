import { useViewLayout } from "@/context";
import { Input } from "antd";

const { Search } = Input;

const ForumListSearchBar: React.FC = () => {
  const layout = useViewLayout();

  return (
    <Search
      placeholder="Cari forum..."
      allowClear
      enterButton
      size="large"
      style={{
        width: layout === "horizontal" ? "50%" : "100%",
      }}
    />
  );
};

export default ForumListSearchBar;
