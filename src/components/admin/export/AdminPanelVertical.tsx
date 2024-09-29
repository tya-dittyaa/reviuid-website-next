import { DividerCenter, TitleLayout } from "@/components/main";
import { SettingOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";

const { Title } = Typography;

const AdminPanelVertical: React.FC = () => {
  return (
    <Flex vertical>
      <TitleLayout icon={<SettingOutlined />} title="Panel Admin" />
      <DividerCenter />
      <Card
        style={{ width: "100%" }}
        styles={{
          body: {
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Title
          level={5}
          style={{
            margin: 0,
            padding: "1rem",
            color: "gray",
            textAlign: "center",
          }}
        >
          Konten ini hanya bisa diakses di mode horizontal!
        </Title>
      </Card>
    </Flex>
  );
};

export default AdminPanelVertical;
