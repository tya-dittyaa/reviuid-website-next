"use client";

import { useWindowSize } from "@/hooks";
import { UserRegister } from "@/types";
import { FetchRefreshToken, FetchUserRegister } from "@/utils";
import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Layout,
  Spin,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const { Text } = Typography;
const { Header } = Layout;

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

  const [isSubmitting, setSubmitting] = useState<boolean>();
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onFinish = async (values: UserRegister) => {
    setSubmitting(true);

    const toastPromise = new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        const register = await FetchUserRegister(values);
        setError(false);
        setErrorMessage("");

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

  return (
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
          onFinish={onFinish}
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
                message: "Input tidak valid! Masukkan alamat email yang benar!",
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
