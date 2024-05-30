"use client";

import { useWindowSize } from "@/hooks";
import { LogoConfig, UserLogin } from "@/types";
import { FetchRefreshToken, FetchUserLogin } from "@/utils";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Spin,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const { Text } = Typography;

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
        }}
      >
        <b style={{ fontWeight: "bold" }}>Reviu.ID</b>
      </Text>
    </a>
  );
}

function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm();

  const [isSubmitting, setSubmitting] = useState<boolean>();
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onFinish = async (values: UserLogin) => {
    setSubmitting(true);

    const toastPromise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        const login = await FetchUserLogin(values);
        setError(false);
        setErrorMessage("");

        switch (login) {
          case 201:
            setTimeout(() => {
              router.replace("/");
            }, 2000);
            resolve("Sukses masuk!");
            break;

          case 500:
            setSubmitting(false);
            setError(true);
            setErrorMessage(
              "Terjadi kesalahan pada server! Silakan coba nanti!"
            );
            reject("Gagal masuk! Silakan coba lagi!");
            break;

          default:
            setSubmitting(false);
            setError(true);
            setErrorMessage(
              "Email atau kata sandi yang Anda masukkan salah! Silakan coba lagi!"
            );
            reject("Gagal masuk! Silakan coba lagi!");
            break;
        }
      }, 1000);
    });

    toast.promise(toastPromise, {
      loading: "Sedang memproses...",
      success: "Sukses masuk!",
      error: "Gagal masuk! Silakan coba lagi!",
    });
  };

  return (
    <Flex vertical style={{ width: "100%", margin: "0 10% 0 10%" }}>
      <Col style={{ fontSize: 30, fontWeight: "bold" }}>Masuk</Col>

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
              placeholder="nama@email.com"
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
            ]}
          >
            <Input.Password
              size="large"
              placeholder="******"
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
              style={{
                backgroundColor: "#E2B808",
              }}
            >
              Masuk
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
          Tidak punya akun?{" "}
          <a
            href="/register"
            style={{
              textDecoration: "none",
              color: "#E2B808",
              fontWeight: "bold",
            }}
          >
            Daftar Sekarang!
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
      <LoginForm />
    </div>
  );
}

function RedBoxHorizontal() {
  return (
    <Col
      flex="auto"
      style={{
        height: "100svh",
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
        minHeight: "100svh",
      }}
    >
      <LoginForm />
    </Col>
  );
}

export default function LoginPage() {
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
        <Flex vertical={true} align="start" style={{ height: "100svh" }}>
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
        <WhiteBoxHorizontal />
        <RedBoxHorizontal />
      </Flex>
      <Toaster richColors position="bottom-right" />
    </>
  );
}
