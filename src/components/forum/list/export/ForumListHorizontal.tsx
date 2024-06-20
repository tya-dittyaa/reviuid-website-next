import { DividerCenter } from "@/components/main";
import { Card, Col, Flex, Typography } from "antd";
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

const ForumListHorizontal: React.FC = () => {
  return (
    <Flex vertical>
      <ForumTextHeader />
      <DividerCenter />

      <Flex vertical gap={20}>
        <Flex gap={20} justify="space-between" align="center">
          <ForumListSearchBar />
          <Flex gap={20}>
            <ForumListCreateButton />
            <ForumListPageBar />
          </Flex>
        </Flex>

        <Flex gap={50}>
          <Col flex="65%">
            <Flex vertical gap={25}>
              <ForumParentList />
            </Flex>
          </Col>

          <Col flex="auto">
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
          </Col>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ForumListHorizontal;
