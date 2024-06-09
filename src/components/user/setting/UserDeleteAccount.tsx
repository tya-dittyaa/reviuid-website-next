import { FetchDeleteAccount } from "@/utils";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const UserDeleteAccount: React.FC = () => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();

  const handleOk = async () => {
    const promise = () =>
      new Promise((resolve, reject) =>
        setTimeout(async () => {
          const response = await FetchDeleteAccount();

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus akun Anda.");
          } else {
            reject("Gagal menghapus akun Anda!");
          }

          setTimeout(() => {
            router.push(`/`);
          }, 1000);
        }, 1000)
      );

    toast.promise(promise, {
      loading: "Memproses penghapusan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const confirm = () => {
    modal.confirm({
      centered: true,
      title: "Konfirmasi Penghapusan Akun",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>Apakah Anda yakin ingin menghapus akun Anda?</p>
          <br />
          <b>Perhatian:</b>
          <p>Tindakan ini tidak dapat dibatalkan!</p>
        </>
      ),
      okText: "Hapus Akun",
      cancelText: "Batal",
      okButtonProps: { icon: <DeleteOutlined />, danger: true },
      onOk: handleOk,
    });
  };

  return (
    <>
      <Button
        block
        danger
        type="default"
        shape="round"
        icon={<DeleteOutlined />}
        size="large"
        onClick={confirm}
      >
        Hapus Akun
      </Button>

      {contextHolder}
    </>
  );
};

export default UserDeleteAccount;
