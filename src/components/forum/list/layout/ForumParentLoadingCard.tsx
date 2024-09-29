import { Card, Spin } from "antd";

const ForumDetailChildLoadingCard: React.FC = () => {
  return (
    <Card
      style={{
        background: "#E2E0D8",
        textAlign: "center",
      }}
    >
      <Spin style={{ margin: 0, padding: 0 }} />
    </Card>
  );
};

export default ForumDetailChildLoadingCard;
