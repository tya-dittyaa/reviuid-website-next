import { DividerCenter, TitleLayout } from "@/components/main";
import { CommentOutlined, MessageOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import ForumDetailParentCard from "../layout/ForumDetailParentCard";
import ForumDetailChildList from "../layout/ForumDetailChildList";

const ForumDetailHorizontal: React.FC = () => {
  return (
    <Flex vertical>
      <TitleLayout icon={<CommentOutlined />} title="Forum Diskusi" />
      <DividerCenter />
      <ForumDetailParentCard />
      <DividerCenter />
      <ForumDetailChildList />
    </Flex>
  );
};

export default ForumDetailHorizontal;
