import { CheckAvailableEmail, FetchChangeEmail } from "@/utils";
import { EditOutlined, MailOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const forceRefresh = () => window.location.reload();

const UserEditEmail: React.FC = () => {
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

  const updateEmail = async (values: { email: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const response = await FetchChangeEmail(values.email);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil memperbarui alamat email.");
          } else {
            reject("Gagal memperbarui alamat email!");
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

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updateEmail(values);
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
        Email
      </Button>

      <Modal
        centered
        title="Ubah Email"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading,
          icon: <SaveOutlined />,
        }}
        cancelButtonProps={{
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
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silakan masukkan alamat email baru Anda!",
              },
              {
                type: "email",
                message: "Input tidak valid! Masukkan alamat email yang benar!",
              },
              {
                validator: async (_, value) => {
                  const response = await CheckAvailableEmail(value);
                  if (response === true) {
                    return Promise.resolve();
                  }
                  if (response === false) {
                    return Promise.reject("Alamat email sudah digunakan!");
                  }
                  return Promise.reject("Terjadi kesalahan pada server!");
                },
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Email Baru Anda"
              addonBefore={<MailOutlined style={{ color: "#969AB8" }} />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserEditEmail;
