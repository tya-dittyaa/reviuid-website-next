import { Card, Typography } from "antd";

const { Meta } = Card;
const { Title } = Typography;

const ForumParentNoDataCard: React.FC = () => {
  return (
    <Card
      style={{
        background: "#E2E0D8",
        textAlign: "center",
      }}
    >
      <Meta
        title={
          <Title level={5} style={{ color: "gray", margin: 0 }}>
            Tidak ada data
          </Title>
        }
      />
    </Card>
  );
};

export default ForumParentNoDataCard;
