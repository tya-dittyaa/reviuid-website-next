import { DividerCenter, TitleLayout } from "@/components/main";
import { MessageOutlined } from "@ant-design/icons";
import { Flex } from "antd";

const ForumDetailHorizontal: React.FC = () => {
  return (
    <Flex vertical>
      <TitleLayout icon={<MessageOutlined />} title="Forum Diskusi" />
      <DividerCenter />
    </Flex>
  );
};

export default ForumDetailHorizontal;
