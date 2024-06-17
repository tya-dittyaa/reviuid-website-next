import {
  CheckAvailableEmail,
  CreateUserOTP,
  FetchChangeEmail,
  VerifyUserOTP,
} from "@/utils";
import { EditOutlined, MailOutlined, SaveOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { Text } = Typography;
const forceRefresh = () => window.location.reload();

const UserEditEmail: React.FC = () => {
  const [form] = Form.useForm();
  const [formOTP] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showModal = () => {
    setOpen(true);
    error && setError(false);
    error && setErrorMessage("");
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    error && setError(false);
    error && setErrorMessage("");
  };

  const verifyOTP = async () => {
    const otp = formOTP.getFieldValue("otp");
    const email = form.getFieldValue("email");

    const toastPromise = new Promise<void>((resolve, reject) => {
      setError(false);
      setErrorMessage("");

      setTimeout(async () => {
        const verify = await VerifyUserOTP({
          email,
          otp,
          type: "CHANGE_EMAIL",
        });

        setConfirmModal(false);
        setOpenModal(false);
        formOTP.resetFields();

        if (verify === undefined) {
          setConfirmLoading(false);
          setError(true);
          setErrorMessage("Terjadi kesalahan pada server! Silakan coba lagi!");
          reject();
          return;
        }

        if (verify !== 1) {
          setConfirmLoading(false);
          switch (verify) {
            case 2:
              setError(true);
              setErrorMessage("Kode OTP tidak ditemukan! Silakan coba lagi!");
              break;

            case 3:
              setError(true);
              setErrorMessage("Kode OTP tidak valid! Silakan coba lagi!");
              break;

            case 4:
              setError(true);
              setErrorMessage("Tipe OTP tidak valid! Silakan coba lagi!");
              break;

            case 5:
              setError(true);
              setErrorMessage("Kode OTP sudah kadaluarsa! Silakan coba lagi!");
              break;

            default:
              setError(true);
              setErrorMessage(
                "Terjadi kesalahan pada server! Silakan coba lagi!"
              );
              break;
          }

          reject();
          return;
        }

        resolve();
        updateEmail();
      }, 1000);
    });

    toast.promise(toastPromise, {
      loading: "Sedang memverifikasi...",
      success: "Berhasil memverifikasi!",
      error: "Gagal memverifikasi! Silakan coba lagi!",
    });
  };

  const updateEmail = async () => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const email = form.getFieldValue("email");
          const response = await FetchChangeEmail(email);

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
            form.resetFields();
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
        showModalOTP();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateOTP = async () => {
    const email = form.getFieldValue("email");
    const sendOtp = await CreateUserOTP({ email, type: "CHANGE_EMAIL" });

    if (!sendOtp) {
      setConfirmLoading(false);
      toast.error("Gagal mengirim OTP! Silakan coba lagi nanti!", {
        duration: 5000,
      });
      return;
    }

    switch (sendOtp) {
      case 1:
        setError(false);
        setErrorMessage("");
        toast.success(
          "Kode OTP telah dikirim ke email Anda! Silakan cek email Anda! Kode OTP akan kadaluarsa dalam 5 menit!",
          { duration: 5000 }
        );
        break;

      case 2:
        setConfirmLoading(false);
        setError(true);
        setErrorMessage("Email sudah terdaftar! Silakan gunakan email lain!");
        return;

      case 3:
        setError(false);
        setErrorMessage("");
        toast.warning(
          "Gunakan kode OTP yang sama dengan yang telah dikirim sebelumnya! Kode OTP tersebut masih berlaku!",
          { duration: 5000 }
        );
        break;

      case 4:
        setConfirmLoading(false);
        toast.error("Gagal mengirim OTP! Silakan coba lagi nanti!", {
          duration: 5000,
        });
        return;

      default:
        setConfirmLoading(false);
        toast.error("Gagal mengirim OTP! Silakan coba lagi nanti!", {
          duration: 5000,
        });
        return;
    }
  };

  const showModalOTP = async () => {
    setConfirmLoading(true);
    await generateOTP();
    setOpenModal(true);
  };

  const closeModalOTP = () => {
    formOTP.resetFields();
    setConfirmLoading(false);
    setOpenModal(false);
  };

  const okModalOTP = () => {
    formOTP
      .validateFields()
      .then((values) => {
        setConfirmModal(true);
        verifyOTP();
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
        closable={false}
        maskClosable={false}
        title="Ubah Email"
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
        <Flex vertical gap={10} style={{ width: "100%" }}>
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
                  message:
                    "Input tidak valid! Masukkan alamat email yang benar!",
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

          {error && (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              style={{ width: "100%" }}
            />
          )}
        </Flex>
      </Modal>

      <Modal
        centered
        closable={false}
        maskClosable={false}
        title="Verifikasi Email"
        open={openModal}
        onOk={okModalOTP}
        confirmLoading={confirmModal}
        onCancel={closeModalOTP}
        okText="Verifikasi"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmModal,
          icon: <SaveOutlined />,
          style: { color: "black" },
        }}
        cancelButtonProps={{
          danger: true,
          disabled: confirmModal,
        }}
      >
        <Flex vertical gap={20} style={{ width: "100%" }}>
          <Text>
            Kode verifikasi (OTP) telah dikirim ke email{" "}
            <b>{form.getFieldValue("email")}</b>. Silakan masukkan kode tersebut
            untuk melanjutkan pergantian alamat email.
          </Text>

          <Form
            form={formOTP}
            initialValues={{ remember: true }}
            autoComplete="off"
            autoCapitalize="off"
            autoSave="off"
            autoCorrect="off"
          >
            <Form.Item
              name="otp"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Silakan masukkan kode OTP!",
                },
                {
                  pattern: /^[0-9]{6}$/,
                  message: "Kode OTP harus 6 digit angka!",
                },
              ]}
            >
              <Input.OTP
                variant="filled"
                size="large"
                formatter={(str) => str.toUpperCase()}
              />
            </Form.Item>
          </Form>
        </Flex>
      </Modal>
    </>
  );
};

export default UserEditEmail;
