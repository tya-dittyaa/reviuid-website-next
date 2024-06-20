import { DividerCenter, TitleLayout } from "@/components/main";
import { MessageOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import ForumDetailParentCard from "../layout/ForumDetailParentCard";
import ForumDetailChildList from "../layout/ForumDetailChildList";

const ForumDetailHorizontal: React.FC = () => {
  return (
    <Flex vertical>
      <TitleLayout icon={<MessageOutlined />} title="Forum Diskusi" />
      <DividerCenter />
      <ForumDetailParentCard />
      <DividerCenter />
      <ForumDetailChildList />
    </Flex>
  );
};

export default ForumDetailHorizontal;
