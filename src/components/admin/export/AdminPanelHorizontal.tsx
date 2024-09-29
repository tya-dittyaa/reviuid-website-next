import { DividerCenter, TitleLayout } from "@/components/main";
import { UserReport } from "@/types";
import { ActionUserReport, GetUserReportList, IgnoreUserReport } from "@/utils";
import { SettingOutlined } from "@ant-design/icons";
import { Flex, Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const columns: TableProps<UserReport>["columns"] = [
  {
    title: "ID Laporan",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tipe Laporan",
    dataIndex: "reportType",
    key: "reportType",
  },
  {
    title: "Konten",
    dataIndex: "reportContent",
    key: "reportContent",
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <Space size="middle">
        <a
          onClick={async () => {
            const res = await IgnoreUserReport(record.id);
            if (res) {
              toast.success("Laporan berhasil diabaikan!");
              window.location.reload();
            } else {
              toast.error("Terjadi kesalahan saat mengabaikan laporan!");
            }
          }}
        >
          Abaikan
        </a>
        <a
          onClick={async () => {
            const res = await ActionUserReport(record.id, record.reportType);
            if (res) {
              toast.success("Tindakan berhasil dilakukan!");
              window.location.reload();
            } else {
              toast.error("Terjadi kesalahan saat melakukan tindakan!");
            }
          }}
        >
          Tindak
        </a>
      </Space>
    ),
  },
];

const AdminPanelHorizontal: React.FC = () => {
  const [data, setData] = useState<UserReport[]>([]);

  const fetchData = async () => {
    const data = await GetUserReportList();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex vertical>
      <TitleLayout icon={<SettingOutlined />} title="Panel Admin" />
      <DividerCenter />
      <Flex
        vertical
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "#E2E0D8",
          borderRadius: 10,
        }}
      >
        <Table
          columns={columns}
          dataSource={data.map((item) => ({ ...item, key: item.id }))}
        />
      </Flex>
    </Flex>
  );
};

export default AdminPanelHorizontal;
