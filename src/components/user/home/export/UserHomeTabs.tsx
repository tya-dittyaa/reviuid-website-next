import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Flex, Tabs, TabsProps, Typography } from "antd";

const { Title } = Typography;

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    icon: <SmileOutlined />,
    label: "Daftar Favorit",
  },
  {
    key: "2",
    icon: <EyeOutlined />,
    label: "Daftar Tontonan",
  },
];

const UserHomeTabs: React.FC = () => {
  return (
    <>
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      <Flex
        vertical
        gap={25}
        justify="center"
        align="center"
        style={{
          backgroundColor: "#E2E0D8",
          padding: "1rem",
          borderRadius: "0 0 0.5rem 0.5rem",
        }}
      >
        <Title level={5} style={{ color: "gray" }}>
          Segera Hadir!
        </Title>
      </Flex>
    </>
  );
};

export default UserHomeTabs;
