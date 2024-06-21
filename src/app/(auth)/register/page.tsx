"use client";

import { useWindowSize } from "@/hooks";
import { UserRegister } from "@/types";
import {
  CheckAvailableEmail,
  CheckAvailableUsername,
  CheckSafetyText,
  CreateUserOTP,
  FetchRefreshToken,
  FetchUserRegister,
  VerifyUserOTP,
} from "@/utils";
import {
  KeyOutlined,
  MailOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
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

function RegisterForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [formOTP] = Form.useForm();

  const [isSubmitting, setSubmitting] = useState<boolean>();
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const checkUsernameAvailability = async (): Promise<boolean> => {
    const username = form.getFieldValue("username");

    // Check safety text
    const isProfanity = await CheckSafetyText(username);

    if (isProfanity === undefined) {
      setSubmitting(false);
      setError(true);
      setErrorMessage("Terjadi kesalahan pada server! Silakan coba lagi!");
      return false;
    }

    if (isProfanity) {
      setSubmitting(false);
      setError(true);
      setErrorMessage(
        "Nama pengguna mengandung kata-kata yang tidak pantas! Silakan gunakan nama pengguna lain!"
      );
      return false;
    }

    // Check username availability
    const check = await CheckAvailableUsername(username);

    if (check === undefined) {
      setSubmitting(false);
      setError(true);
      setErrorMessage("Terjadi kesalahan pada server! Silakan coba lagi!");
      return false;
    }

    if (!check) {
      setSubmitting(false);
      setError(true);
      setErrorMessage(
        "Nama pengguna sudah digunakan! Silakan gunakan nama pengguna lain!"
      );
      return false;
    }

    return true;
  };

  const checkEmailAvailability = async (): Promise<boolean> => {
    const email = form.getFieldValue("email");
    const check = await CheckAvailableEmail(email);

    if (check === undefined) {
      setSubmitting(false);
      setError(true);
      setErrorMessage("Terjadi kesalahan pada server! Silakan coba lagi!");
      return false;
    }

    if (!check) {
      setSubmitting(false);
      setError(true);
      setErrorMessage("Email sudah digunakan! Silakan gunakan email lain!");
      return false;
    }

    return true;
  };

  const doRegistration = async (values: UserRegister & { otp: string }) => {
    const toastPromise = new Promise<void>((resolve, reject) => {
      setError(false);
      setErrorMessage("");

      setTimeout(async () => {
        const verify = await VerifyUserOTP({
          email: values.email,
          otp: values.otp,
          type: "REGISTER",
        });

        setConfirmModal(false);
        setOpenModal(false);
        formOTP.resetFields();

        if (verify === undefined) {
          setSubmitting(false);
          setError(true);
          setErrorMessage("Terjadi kesalahan pada server! Silakan coba lagi!");
          reject();
          return;
        }

        if (verify !== 1) {
          setSubmitting(false);
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
              setErrorMessage("Kode OTP telah kadaluarsa! Silakan coba lagi!");
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

        const register = await FetchUserRegister(values);

        switch (register.code) {
          case 200:
            setTimeout(() => {
              router.replace("/");
            }, 2000);
            resolve();
            break;

          default:
            setSubmitting(false);
            setError(true);
            setErrorMessage(register.message);
            reject();
            break;
        }
      }, 1000);
    });

    toast.promise(toastPromise, {
      loading: "Sedang memproses...",
      success: "Sukses mendaftar!",
      error: "Gagal mendaftar! Silakan coba lagi!",
    });
  };

  const generateOTP = async () => {
    const email = form.getFieldValue("email");
    const sendOtp = await CreateUserOTP({ email, type: "REGISTER" });

    if (!sendOtp) {
      setSubmitting(false);
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
        setSubmitting(false);
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
        setSubmitting(false);
        toast.error("Gagal mengirim OTP! Silakan coba lagi nanti!", {
          duration: 5000,
        });
        return;

      default:
        setSubmitting(false);
        toast.error("Gagal mengirim OTP! Silakan coba lagi nanti!", {
          duration: 5000,
        });
        return;
    }
  };

  const showModal = async () => {
    setSubmitting(true);

    const check = await checkUsernameAvailability();
    if (!check) return;

    const checkEmail = await checkEmailAvailability();
    if (!checkEmail) return;

    await generateOTP();
    setOpenModal(true);
  };

  const closeModal = () => {
    formOTP.resetFields();
    setSubmitting(false);
    setOpenModal(false);
  };

  const okModal = async () => {
    formOTP
      .validateFields()
      .then((values) => {
        setConfirmModal(true);
        doRegistration({ ...form.getFieldsValue(), otp: values.otp });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Flex vertical style={{ width: "100%", margin: "0 10% 0 10%" }}>
        <Col style={{ fontSize: 30, fontWeight: "bold" }}>Daftar</Col>

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
              name="username"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Silakan masukkan nama pengguna Anda!",
                },
                {
                  min: 3,
                  message: "Nama pengguna minimal 3 karakter!",
                },
                {
                  max: 16,
                  message: "Nama pengguna maksimal 16 karakter!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Username Anda"
                disabled={isSubmitting}
                addonBefore={<UserOutlined style={{ color: "#969AB8" }} />}
              />
            </Form.Item>

            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  type: "email",
                  message:
                    "Input tidak valid! Masukkan alamat email yang benar!",
                },
                {
                  required: true,
                  message: "Silakan masukkan alamat email Anda!",
                },
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

            <Form.Item
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Silakan masukkan kata sandi Anda!",
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
                placeholder="Password Anda"
                disabled={isSubmitting}
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
                  message: "Silakan masukkan ulang kata sandi Anda!",
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
                placeholder="Ulangi Password Anda"
                disabled={isSubmitting}
                addonBefore={<KeyOutlined style={{ color: "#969AB8" }} />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                Daftar
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
            Sudah punya akun?{" "}
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
            untuk melanjutkan pendaftaran.
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
      <RegisterForm />
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
      <RegisterForm />
    </Col>
  );
}

export default function RegisterPage() {
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
