import { useViewLayout } from "@/context";
import { Pagination } from "antd";

const ForumListPageBar: React.FC = () => {
  const layout = useViewLayout();

  return (
    <Pagination
      simple
      responsive
      showSizeChanger={false}
      style={{
        width: layout === "horizontal" ? "auto" : "100%",
        padding: "0.3rem",
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

export default ForumListPageBar;
