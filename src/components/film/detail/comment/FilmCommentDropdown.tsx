import { FilmReviewData } from "@/types";
import { AddUserReport } from "@/utils";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { toast } from "sonner";

const FilmCommentDropdown: React.FC<{
  reviewData: FilmReviewData;
}> = ({ reviewData }) => {
  const items: MenuProps["items"] = [
    {
      key: "report",
      danger: true,
      icon: <DeleteOutlined />,
      label: "Laporkan Komentar",
      onClick: async () => {
        const res = await AddUserReport(
          reviewData.id,
          "USER_FORUM_CHILD_CONTENT",
          reviewData.review,
          reviewData.user.id
        );

        if (res === undefined) {
          toast.error("Terjadi kesalahan pada server!");
        } else if (res === false) {
          toast.error("Terjadi kesalahan saat melaporkan balasan!");
        } else {
          toast.success("Balasan berhasil dilaporkan!");
        }
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <MoreOutlined key="ellipsis" style={{ fontSize: 20, color: "black" }} />
      </a>
    </Dropdown>
  );
};

export default FilmCommentDropdown;