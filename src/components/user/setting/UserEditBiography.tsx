import { FetchChangeBiography } from "@/utils";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const forceRefresh = () => window.location.reload();

const UserEditBiography: React.FC = () => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const updateBiography = async (values: { biography: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const response = await FetchChangeBiography(values.biography);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil memperbarui deskripsi pengguna.");
          } else {
            reject("Gagal memperbarui deskripsi pengguna!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
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

  const updateEmptyBiography = async () => {
    setConfirmDelete(true);

    const promise = () =>
      new Promise((resolve, reject) =>
        setTimeout(async () => {
          const response = await FetchChangeBiography(null);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus deskripsi pengguna.");
          } else {
            reject("Gagal menghapus deskripsi pengguna!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmDelete(false);
            forceRefresh();
          }, 1000);
        }, 1000)
      );

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

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updateBiography(values);
      })
      .catch((error) => {
        console.log(error);
      });
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
        Biografi Pengguna
      </Button>

      <Modal
        centered
        title="Ubah Biografi Pengguna"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading || confirmDelete,
          icon: <SaveOutlined />,
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
              onClick={updateEmptyBiography}
              loading={confirmDelete}
              disabled={confirmLoading}
            >
              Hapus
            </Button>
            <OkBtn />
          </>
        )}
      >
        <Form
          form={form}
          autoComplete="off"
          autoCapitalize="off"
          autoSave="off"
          autoCorrect="off"
        >
          <Form.Item
            name="biography"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silakan masukkan deskripsi Anda!",
              },
              {
                max: 160,
                message: "Biografi maksimal 160 karakter!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Deskripsi Pengguna"
              showCount
              maxLength={160}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserEditBiography;
