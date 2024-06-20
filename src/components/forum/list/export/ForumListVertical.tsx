import { DividerCenter } from "@/components/main";
import { Card, Flex, Typography } from "antd";
import ForumListCreateButton from "../action/ForumListCreateButton";
import ForumListPageBar from "../action/ForumListPageBar";
import ForumListSearchBar from "../action/ForumListSearchBar";
import ForumParentList from "../layout/ForumParentList";
import ForumTextHeader from "../layout/ForumTextHeader";

const { Title } = Typography;
const { Meta } = Card;

const rules = [
  "Tidak diperbolehkan menggunakan kata-kata yang mengandung SARA (Suku, Agama, Ras, Antar-golongan)",
  "Tidak diperbolehkan menggunakan ujaran kebencian atau kata-kata yang merendahkan",
  "Tidak diperbolehkan melakukan promosi atau iklan yang tidak relevan dengan topik diskusi",
  "Tidak diperbolehkan melakukan spamming atau mengirim pesan berulang-ulang dengan tujuan yang sama",
  "Selalu fokus pada topik utama forum tersebut",
];

const ForumListVertical: React.FC = () => {
  return (
    <Flex vertical>
      <ForumTextHeader />
      <DividerCenter />

      <Flex vertical gap={25}>
        <Card
          title="Aturan Forum"
          bordered={false}
          style={{
            backgroundColor: "#E2E0D8",
            width: "100%",
          }}
        >
          <ol
            type="1"
            style={{
              listStyleType: "decimal",
              padding: "0 1rem",
            }}
          >
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ol>
        </Card>

        <Flex vertical gap={20} justify="space-between">
          <ForumListSearchBar />
          <Flex gap={20} justify="space-between">
            <ForumListCreateButton />
            <ForumListPageBar />
          </Flex>
        </Flex>

        <ForumParentList />
      </Flex>
    </Flex>
  );
};

export default ForumListVertical;
