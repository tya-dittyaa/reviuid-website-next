import { FetchChangePassword } from "@/utils";
import { EditOutlined, KeyOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const forceRefresh = () => window.location.reload();

const UserEditPassword: React.FC = () => {
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

  const updatePassword = async (values: { password: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const response = await FetchChangePassword(values.password);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil memperbarui kata sandi.");
          } else {
            reject("Gagal memperbarui kata sandi!");
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
        updatePassword(values);
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
        Kata Sandi
      </Button>

      <Modal
        centered
        title="Ubah Kata Sandi"
        visible={open}
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
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silakan masukkan kata sandi baru Anda!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|\\])[A-Za-z\d*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|\\]{8,32}$/,
                message: `Password harus memiliki 1 angka, huruf kecil, huruf kapital, karakter khusus, dan panjang 8-32 karakter!`,
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Kata Sandi Baru Anda"
              addonBefore={<KeyOutlined style={{ color: "#969AB8" }} />}
            />
          </Form.Item>

          <Form.Item
            name="repeatPassword"
            hasFeedback
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Silakan masukkan ulang kata sandi baru Anda!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Kata sandi yang Anda masukkan tidak sama!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Ulangi Kata Sandi Baru Anda"
              addonBefore={<KeyOutlined style={{ color: "#969AB8" }} />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserEditPassword;
