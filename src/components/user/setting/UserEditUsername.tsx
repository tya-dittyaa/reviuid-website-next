import { CheckAvailableUsername, FetchChangeUsername } from "@/utils";
import { EditOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const UserEditUsername: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  function hasSpace(input: any): boolean {
    if (typeof input !== "string") {
      return false;
    }
    return input.includes(" ");
  }

  const updateUsername = async (values: { username: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          let validResponse = false;
          const response = await FetchChangeUsername(values.username);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            validResponse = true;
            resolve("Berhasil memperbarui nama pengguna.");
          } else {
            reject("Gagal memperbarui nama pengguna!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            if (validResponse) {
              router.push(`/user/${values.username}/settings`);
            }
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

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updateUsername(values);
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
        Nama Pengguna
      </Button>

      <Modal
        centered
        closable={false}
        maskClosable={false}
        title="Ubah Nama Pengguna"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading,
          icon: <SaveOutlined />,
          style: { color: "black" },
        }}
        cancelButtonProps={{
          danger: true,
          disabled: confirmLoading,
        }}
      >
        <Form
          form={form}
          autoComplete="off"
          autoCapitalize="off"
          autoSave="off"
          autoCorrect="off"
        >
          <Form.Item
            name="username"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silakan masukkan nama pengguna baru Anda!",
              },
              {
                min: 3,
                message: "Nama pengguna minimal 3 karakter!",
              },
              {
                max: 16,
                message: "Nama pengguna maksimal 16 karakter!",
              },
              {
                validator: async (_, value) => {
                  if (hasSpace(value)) {
                    return Promise.reject(
                      "Nama pengguna tidak boleh mengandung spasi!"
                    );
                  }

                  const response = await CheckAvailableUsername(value);
                  if (response === true) {
                    return Promise.resolve();
                  }
                  if (response === false) {
                    return Promise.reject("Nama pengguna sudah digunakan!");
                  }
                  return Promise.reject("Terjadi kesalahan pada server!");
                },
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Username Baru Anda"
              addonBefore={<UserOutlined style={{ color: "#969AB8" }} />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserEditUsername;
