"use client";

import { useWindowSize } from "@/hooks";
import {
  CheckAvailableEmail,
  CreateUserOTP,
  FetchForgotPassword,
  FetchRefreshToken,
  VerifyUserOTP,
} from "@/utils";
import { MailOutlined, SendOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Spin,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const { Text } = Typography;

type LogoConfig = {
  AvatarSize: number;
  FontSize: number;
};

function ForgotPasswordForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [formOTP] = Form.useForm();

  const [isSubmitting, setSubmitting] = useState<boolean>();
  const [isError, setError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [openModal, setOpenModal] = useState<boolean>();
  const [confirmModal, setConfirmModal] = useState<boolean>();

  const validateOTP = async (otp: string): Promise<boolean> => {
    const email = form.getFieldValue("email");
    const verify = await VerifyUserOTP({ email, otp, type: "FORGOT_PASSWORD" });

    switch (verify) {
      case 1:
        setError(false);
        setErrorMessage("");
        return true;

      case 2:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Kode OTP tidak ditemukan. Silakan coba lagi.");
        return false;

      case 3:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Kode OTP tidak valid. Silakan coba lagi.");
        return false;

      case 4:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Tipe OTP tidak valid. Silakan coba lagi.");

      case 5:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Kode OTP sudah kadaluarsa. Silakan coba lagi.");

      default:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Terjadi kesalahan pada server. Silakan coba lagi.");
        return false;
    }
  };

  const generateNewPassword = async (): Promise<boolean> => {
    const email = form.getFieldValue("email");
    const generate = await FetchForgotPassword(email);

    switch (generate) {
      case 1:
        setError(false);
        setErrorMessage("");
        return true;

      case 2:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Email tidak ditemukan.");
        return false;

      case 3:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Gagal mengirim email. Silakan coba lagi.");
        return false;

      default:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Terjadi kesalahan pada server. Silakan coba lagi.");
        return false;
    }
  };

  const generateOTP = async (email: string): Promise<boolean> => {
    const generate = await CreateUserOTP({ email, type: "FORGOT_PASSWORD" });

    if (generate === undefined) {
      setSubmitting(false);
      setError(true);
      setErrorMessage("Terjadi kesalahan pada server. Silakan coba lagi.");
      return false;
    }

    if (!generate) {
      setSubmitting(false);
      setError(true);
      setErrorMessage(
        "Gagal mengirim kode OTP ke email Anda. Silakan coba lagi."
      );
      return false;
    }

    switch (generate) {
      case 1:
        setError(false);
        setErrorMessage("");
        toast.success(
          "Kode OTP berhasil dikirim ke email Anda. Silakan cek email Anda. Kode OTP akan kadaluarsa dalam 5 menit.",
          { duration: 5000 }
        );
        return true;

      case 2:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Email tidak terdaftar.");
        return false;

      case 3:
        setError(false);
        setErrorMessage("");
        toast.warning(
          "Gunakan kode OTP yang sama yang telah dikirim sebelumnya. Kode OTP tersebut masih berlaku.",
          { duration: 5000 }
        );
        return true;

      case 4:
        setSubmitting(false);
        setError(true);
        setErrorMessage(
          "Gagal mengirim kode OTP ke email Anda. Silakan coba lagi."
        );
        return false;

      default:
        setSubmitting(false);
        setError(true);
        setErrorMessage("Terjadi kesalahan pada server. Silakan coba lagi.");
        return false;
    }
  };

  const checkEmail = async (email: string): Promise<boolean> => {
    const check = await CheckAvailableEmail(email);

    if (check === undefined) {
      setSubmitting(false);
      setError(true);
      setErrorMessage("Terjadi kesalahan pada server. Silakan coba lagi.");
      return false;
    }

    if (check === true) {
      setSubmitting(false);
      setError(true);
      setErrorMessage("Email tidak terdaftar.");
      return false;
    }

    return true;
  };

  const showModal = async () => {
    setError(false);
    setErrorMessage("");
    setSubmitting(true);

    const email = form.getFieldValue("email");

    const isEmailValid = await checkEmail(email);
    if (!isEmailValid) return;

    const isOTPGenerated = await generateOTP(email);
    if (!isOTPGenerated) return;

    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setConfirmModal(false);
    setSubmitting(false);
    formOTP.resetFields();
  };

  const okModal = () => {
    formOTP
      .validateFields()
      .then(async (values) => {
        setConfirmModal(true);
        closeModal();

        const validateOTPResult = await validateOTP(values.otp);
        if (!validateOTPResult) return;

        const generateNewPasswordResult = await generateNewPassword();
        if (!generateNewPasswordResult) return;

        toast.success("Kata sandi baru telah dikirim ke email Anda.", {
          duration: 5000,
        });

        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Flex vertical style={{ width: "100%", margin: "0 10% 0 10%" }}>
        <Col style={{ fontSize: 30, fontWeight: "bold" }}>Lupa Kata Sandi</Col>

        <Col style={{ margin: "30px 0 15px 0", color: "#969AB8" }}>
          <Form
            form={form}
            initialValues={{ remember: true }}
            autoComplete="off"
            autoCapitalize="off"
            autoSave="off"
            autoCorrect="off"
            onFinish={showModal}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email tidak boleh kosong" },
                { type: "email", message: "Email tidak valid" },
              ]}
            >
              <Input
                size="large"
                placeholder="Email Anda"
                disabled={isSubmitting}
                addonBefore={<MailOutlined style={{ color: "#969AB8" }} />}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  (e.target.value = e.target.value.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isSubmitting}
              >
                Kirim Email
              </Button>
            </Form.Item>
          </Form>

          {isError && (
            <Alert
              message="Error"
              description={errorMessage}
              type="error"
              showIcon
            />
          )}
        </Col>

        {!isSubmitting && (
          <Col style={{ color: "#969AB8" }}>
            Sudah ingat kata sandi Anda?{" "}
            <a
              href="/login"
              style={{
                textDecoration: "none",
                color: "#E2B808",
                fontWeight: "bold",
              }}
            >
              Masuk Sekarang!
            </a>
          </Col>
        )}
      </Flex>

      <Modal
        centered
        closable={false}
        maskClosable={false}
        title="Verifikasi Email"
        open={openModal}
        onOk={okModal}
        confirmLoading={confirmModal}
        onCancel={closeModal}
        okText="Verifikasi"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmModal,
          icon: <SendOutlined />,
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
            untuk melanjutkan pengiriman kata sandi baru.
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
}

function ReviuIDLogo(logoConfig: LogoConfig) {
  return (
    <a
      href="/"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <Avatar
        size={logoConfig.AvatarSize}
        src={<Image src="/logo.png" alt="Reviu.ID Logo" preview={false} />}
      />
      <Text
        strong
        style={{
          color: "#E2B808",
          fontSize: logoConfig.FontSize,
          marginLeft: 20,
          fontWeight: "bolder",
        }}
      >
        <b style={{ fontWeight: "bold" }}>Reviu.ID</b>
      </Text>
    </a>
  );
}

function RedBoxVertical() {
  return (
    <div
      style={{
        flex: "0 0 15%",
        backgroundColor: "#9E140F",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ReviuIDLogo AvatarSize={50} FontSize={35} />
    </div>
  );
}

function WhiteBoxVertical() {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#E2B808",
        width: "100%",
      }}
    >
      <ForgotPasswordForm />
    </div>
  );
}

function RedBoxHorizontal() {
  return (
    <Col
      flex="auto"
      style={{
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReviuIDLogo AvatarSize={70} FontSize={55} />
    </Col>
  );
}

function WhiteBoxHorizontal() {
  return (
    <Col
      flex="45%"
      style={{
        backgroundColor: "white",
        color: "#E2B808",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
      }}
    >
      <ForgotPasswordForm />
    </Col>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const size = useWindowSize();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<"vertical" | "horizontal">("horizontal");

  useEffect(() => {
    if (size.width && size.width < 800) {
      setValue("vertical");
    } else {
      setValue("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    setTimeout(async () => {
      const refresh = await FetchRefreshToken();
      if (refresh) router.replace("/");
      else setIsLoading(false);
    }, 1000);
  }, [router]);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (value === "vertical") {
    return (
      <>
        <Flex vertical={true} align="start" style={{ height: "100dvh" }}>
          <RedBoxVertical />
          <WhiteBoxVertical />
        </Flex>
        <Toaster richColors position="bottom-center" />
      </>
    );
  }

  return (
    <>
      <Flex vertical={false} align="start" style={{ width: "100%" }}>
        <RedBoxHorizontal />
        <WhiteBoxHorizontal />
      </Flex>
      <Toaster richColors position="bottom-left" />
    </>
  );
}
