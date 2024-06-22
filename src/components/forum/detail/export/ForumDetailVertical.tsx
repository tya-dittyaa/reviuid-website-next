import { DividerCenter, TitleLayout } from "@/components/main";
import { CommentOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import ForumDetailChildList from "../layout/ForumDetailChildList";
import ForumDetailParentCard from "../layout/ForumDetailParentCard";

const ForumDetailVertical: React.FC = () => {
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

export default ForumDetailVertical;
