"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { useWindowSize } from "@/hooks";
import { UserProfile, UserSession, UserSettings, ViewType } from "@/types";
import { GetUserProfile, GetUserSession } from "@/utils";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Layout,
  Modal,
  Spin,
  Typography,
} from "antd";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

function EditAvatar() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        block
        type="default"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        onClick={() => setModalOpen(true)}
      >
        Foto Profil
      </Button>

      <Modal
        title="Ganti Foto Profil"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>some contents...</p>
      </Modal>
    </>
  );
}

function DisplayUserVertical({ user }: { user: UserSettings }) {
  return (
    <>
      <Flex
        vertical
        justify="center"
        style={{
          backgroundColor: "whitesmoke",
          borderRadius: 10,
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
          padding: "2rem",
        }}
      >
        <Avatar
          size={100}
          icon={
            <Image
              src={user.avatar}
              width={2048}
              height={2048}
              alt={`Avatar ${user.username}`}
            />
          }
          style={{
            borderColor: "black",
            borderWidth: 2,
            borderStyle: "solid",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
            marginBottom: "1rem",
          }}
        />

        <Title level={4} style={{ margin: "0 0 0 0" }}>
          {user.username}
        </Title>
        <Title level={5} style={{ margin: "0 0 20px 0", fontStyle: "italic" }}>
          {user.email}
        </Title>

        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </Flex>
    </>
  );
}

function DisplayUserHorizontal({ user }: { user: UserSettings }) {
  return (
    <Flex
      gap="30px"
      vertical={false}
      align="center"
      style={{
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
        padding: "2rem",
      }}
    >
      <div>
        <Avatar
          size={150}
          icon={
            <Image
              src={user.avatar}
              width={2048}
              height={2048}
              alt={`Avatar ${user.username}`}
            />
          }
          style={{
            borderColor: "black",
            borderWidth: 2,
            borderStyle: "solid",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
          }}
        />
      </div>

      <div>
        <Title level={4} style={{ margin: "0 0 0 0" }}>
          {user.username}
        </Title>
        <Title level={5} style={{ margin: "0 0 20px 0", fontStyle: "italic" }}>
          {user.email}
        </Title>
        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </div>
    </Flex>
  );
}

function ButtonSetting({ layout }: { layout: ViewType }) {
  return (
    <Flex
      gap="10px"
      vertical={layout === "vertical" ? true : false}
      align="center"
      justify="center"
      style={{
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
        padding: "1rem",
      }}
    >
      <Flex
        vertical
        gap="10px"
        style={{
          width: "100%",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <Title level={4} style={{ margin: "0 0 0 0" }}>
          Ubah Pengaturan Akun
        </Title>
      </Flex>

      <Flex vertical gap="10px" style={{ width: "100%" }}>
        <EditAvatar />
        <Button
          block
          type="default"
          shape="round"
          icon={<EditOutlined />}
          size="large"
        >
          Nama Pengguna
        </Button>
        <Button
          block
          type="default"
          shape="round"
          icon={<EditOutlined />}
          size="large"
        >
          Biografi Pengguna
        </Button>
      </Flex>

      <Flex vertical gap="10px" style={{ width: "100%" }}>
        <Button
          block
          type="default"
          shape="round"
          icon={<EditOutlined />}
          size="large"
        >
          Email
        </Button>
        <Button
          block
          type="default"
          shape="round"
          icon={<EditOutlined />}
          size="large"
        >
          Kata Sandi
        </Button>
        <Button
          block
          danger
          type="default"
          shape="round"
          icon={<EditOutlined />}
          size="large"
        >
          Hapus Akun
        </Button>
      </Flex>
    </Flex>
  );
}

function SettingText({ layout }: { layout: ViewType }) {
  return (
    <Flex vertical style={{ width: "100%" }}>
      <Col
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Avatar
          size={layout === "horizontal" ? "large" : "default"}
          icon={<SettingOutlined />}
          style={{
            backgroundColor: "#E2B808",
            color: "black",
            marginRight: "1rem",
          }}
        />

        <Text
          strong
          style={{
            color: "#E2B808",
            fontSize: 30,
          }}
        >
          <b style={{ fontWeight: "bold" }}>Pengaturan</b>
        </Text>
      </Col>
    </Flex>
  );
}

function UserFound({ layout, user }: { layout: ViewType; user: UserSettings }) {
  return (
    <Content
      style={{
        flex: 1,
        backgroundColor: "#9E140F",
        display: "flex",
        flexDirection: "column",
        padding: layout === "horizontal" ? "2rem" : "1rem",
      }}
    >
      <SettingText layout={layout} />

      <Divider
        orientation="center"
        style={{
          borderColor: "black",
          borderWidth: 2,
          margin: "20px 0 20px 0",
        }}
      />

      {layout === "vertical" ? (
        <DisplayUserVertical user={user} />
      ) : (
        <DisplayUserHorizontal user={user} />
      )}

      <Divider
        orientation="center"
        style={{
          borderColor: "black",
          borderWidth: 2,
          margin: "20px 0 20px 0",
        }}
      />

      <ButtonSetting layout={layout} />
    </Content>
  );
}

export default function SettingsPage({
  params,
}: {
  params: { username: string };
}) {
  const size = useWindowSize();
  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  useEffect(() => {
    if (size.width && size.width < 800) {
      setLayout("vertical");
    } else {
      setLayout("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await GetUserProfile(params.username);
      if (typeof response !== "number") {
        setUserData(response);
      }
      return;
    };
    getUserData();
  }, [params.username]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await GetUserSession();
      setUserSession(response);
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (userData && userSession && userSession.username === params.username) {
      setUserSettings({
        username: userData.username,
        email: userSession.email,
        avatar: userData.avatar,
        biography: userData.biography,
        role: userSession.role,
      });
    }
  }, [params.username, userData, userSession]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (userSettings === null) {
    return notFound();
  }

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <HeaderLayout />
      <UserFound layout={layout} user={userSettings} />
      <FooterLayout />
    </Layout>
  );
}
