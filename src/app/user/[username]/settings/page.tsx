"use client";

import {
  FooterLayout,
  HeaderLayout,
  UserDeleteAccount,
  UserEditAvatar,
  UserEditBiography,
  UserEditEmail,
  UserEditPassword,
  UserEditUsername,
} from "@/components";
import {
  UserProfileProvider,
  UserSessionProvider,
  UserSettingsProvider,
  ViewLayoutProvider,
  useUserSettings,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserProfile, UserSession, UserSettings } from "@/types";
import { GetUserProfile, GetUserSession } from "@/utils";
import { SettingOutlined } from "@ant-design/icons";
import { Avatar, Col, Divider, Flex, Layout, Spin, Typography } from "antd";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

function DisplayUserVertical() {
  const user = useUserSettings()!;

  return (
    <>
      <Flex
        vertical
        justify="center"
        style={{
          backgroundColor: "#E2E0D8",
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

function DisplayUserHorizontal() {
  const user = useUserSettings()!;

  return (
    <Flex
      gap="30px"
      vertical={false}
      align="center"
      style={{
        backgroundColor: "#E2E0D8",
        borderRadius: 10,
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
        padding: "2rem",
      }}
    >
      <div>
        <Avatar
          size={125}
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

function ButtonSetting() {
  const layout = useViewLayout();

  return (
    <Flex
      gap="10px"
      vertical={layout === "vertical" ? true : false}
      align="center"
      justify="center"
      style={{
        backgroundColor: "#E2E0D8",
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
        <UserEditAvatar />
        <UserEditUsername />
        <UserEditBiography />
      </Flex>

      <Flex vertical gap="10px" style={{ width: "100%" }}>
        <UserEditEmail />
        <UserEditPassword />
        <UserDeleteAccount />
      </Flex>
    </Flex>
  );
}

function SettingText() {
  const layout = useViewLayout();

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

function DividerText() {
  return (
    <Divider
      orientation="center"
      style={{
        borderColor: "black",
        borderWidth: 2,
        margin: "20px 0 20px 0",
      }}
    />
  );
}

function UserFound() {
  const layout = useViewLayout();

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
      <SettingText />
      <DividerText />

      {layout === "vertical" ? (
        <DisplayUserVertical />
      ) : (
        <DisplayUserHorizontal />
      )}

      <DividerText />
      <ButtonSetting />
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
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
  };

  const getUserProfile = async (username: string) => {
    const response = await GetUserProfile(username);
    if (typeof response !== "number") {
      setUserProfile(response);
    }
  };

  useEffect(() => {
    if (size.width && size.width < 800) {
      setLayout("vertical");
    } else {
      setLayout("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    getUserSession();
    getUserProfile(params.username);
  }, [params.username]);

  useEffect(() => {
    if (
      userProfile &&
      userSession &&
      userSession.username === params.username
    ) {
      setUserSettings({
        username: userProfile.username,
        email: userSession.email,
        avatar: userProfile.avatar,
        biography: userProfile.biography,
        role: userSession.role,
      });
    }
  }, [params.username, userProfile, userSession]);

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
    <ViewLayoutProvider view={layout}>
      <UserSessionProvider user={userSession}>
        <UserProfileProvider user={userProfile}>
          <UserSettingsProvider user={userSettings}>
            <Layout style={{ minHeight: "100dvh" }}>
              <HeaderLayout />
              <UserFound />
              <FooterLayout />
              <Toaster richColors position="bottom-right" />
            </Layout>
          </UserSettingsProvider>
        </UserProfileProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
