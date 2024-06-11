import { FetchDeleteAvatar, FetchUploadAvatar } from "@/utils";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, GetProp, Modal, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const forceRefresh = () => window.location.reload();
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UserEditAvatar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fileImage, setFileImage] = useState<UploadFile | null>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const formData = new FormData();
          formData.append("avatar", fileImage as FileType);

          const response = await FetchUploadAvatar(formData);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil mengunggah foto profil.");
          } else {
            reject("Gagal mengunggah foto profil!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            setFileImage(null);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleDelete = async () => {
    setConfirmDelete(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const formData = new FormData();
          formData.append("avatar", fileImage as FileType);

          const response = await FetchDeleteAvatar();

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus foto profil.");
          } else {
            reject("Gagal menghapus foto profil!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmDelete(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setFileImage(null);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("Foto profil harus berformat JPG atau PNG.");
    }

    const isLowerSize = file.size / 1024 / 1024 < 10;
    if (!isLowerSize) {
      toast.error("Gambar harus lebih kecil dari 10MB.");
    }

    const isImage = isJpgOrPng && isLowerSize;
    if (isImage) {
      setFileImage(file);
    }

    return isImage || Upload.LIST_IGNORE;
  };

  const uploadProps: UploadProps = {
    maxCount: 1,
    listType: "picture",
    showUploadList: fileImage ? true : false,
    beforeUpload: beforeUpload,
    onRemove: () => {
      setFileImage(null);
    },
  };

  return (
    <>
      <Button
        block
        type="default"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        onClick={showModal}
      >
        Foto Profil
      </Button>

      <Modal
        centered
        title="Ubah Foto Profil"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: fileImage === null || confirmLoading || confirmDelete,
          icon: <CloudUploadOutlined />,
          style: { color: "black" },
        }}
        cancelButtonProps={{
          disabled: confirmLoading || confirmDelete,
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              loading={confirmDelete}
              disabled={confirmLoading}
            >
              Hapus
            </Button>
            <OkBtn />
          </>
        )}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Klik untuk Mengunggah</Button>
        </Upload>
      </Modal>
    </>
  );
};

export default UserEditAvatar;
