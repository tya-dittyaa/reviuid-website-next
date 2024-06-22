import { UserProfile } from "@/types";
import { AddUserReport } from "@/utils";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { toast } from "sonner";

const UserProfileDropdown: React.FC<{
  userData: UserProfile;
}> = ({ userData }) => {
  const items: MenuProps["items"] = [
    {
      key: "report_avatar",
      danger: true,
      icon: <DeleteOutlined />,
      label: "Laporkan Avatar",
      onClick: async () => {
        const res = await AddUserReport(
          userData.id,
          "USER_AVATAR",
          userData.avatar!,
          userData.id
        );

        if (res === undefined) {
          toast.error("Terjadi kesalahan pada server!");
        } else if (res === false) {
          toast.error("Terjadi kesalahan saat melaporkan username!");
        } else {
          toast.success("Username berhasil dilaporkan!");
        }
      },
    },
    {
      key: "report_username",
      danger: true,
      icon: <DeleteOutlined />,
      label: "Laporkan Username",
      onClick: async () => {
        const res = await AddUserReport(
          userData.id,
          "USER_USERNAME",
          userData.username,
          userData.id
        );

        if (res === undefined) {
          toast.error("Terjadi kesalahan pada server!");
        } else if (res === false) {
          toast.error("Terjadi kesalahan saat melaporkan username!");
        } else {
          toast.success("Username berhasil dilaporkan!");
        }
      },
    },
    {
      key: "report_biography",
      danger: true,
      icon: <DeleteOutlined />,
      label: "Laporkan Biografi",
      onClick: async () => {
        const res = await AddUserReport(
          userData.id,
          "USER_BIOGRAPHY",
          userData.biography!,
          userData.id
        );

        if (res === undefined) {
          toast.error("Terjadi kesalahan pada server!");
        } else if (res === false) {
          toast.error("Terjadi kesalahan saat melaporkan biografi!");
        } else {
          toast.success("Biografi berhasil dilaporkan!");
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

export default UserProfileDropdown;
