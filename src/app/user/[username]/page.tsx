"use client";

import { DividerCenter, FooterLayout, HeaderLayout } from "@/components";
import {
  UserProfileProvider,
  UserSessionProvider,
  ViewLayoutProvider,
  useUserProfile,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserProfile, UserSession } from "@/types";
import { GetUserProfile, GetUserSession } from "@/utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Flex, Layout, Spin, Typography } from "antd";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function DisplayUserVertical() {
  const user = useUserProfile()!;

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
              priority
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

        <Title level={4}>{user.username}</Title>

        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </Flex>
    </>
  );
}

function DisplayUserHorizontal() {
  const user = useUserProfile()!;

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
              priority
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
        <Title level={4}>{user.username}</Title>
        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </div>
    </Flex>
  );
}

function ProfileText() {
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
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#E2B808",
            color: "black",
            marginRight: "1rem",
          }}
        />

        <Title
          level={2}
          style={{
            color: "#E2B808",
            margin: 0,
          }}
        >
          Profil Pengguna
        </Title>
      </Col>
    </Flex>
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
      <ProfileText />
      <DividerCenter />

      {layout === "vertical" ? (
        <DisplayUserVertical />
      ) : (
        <DisplayUserHorizontal />
      )}

      <DividerCenter />
    </Content>
  );
}

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
    getUserProfile(params.username);
    getUserSession();
  }, [params.username]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (!userProfile) {
    return notFound();
  }

  return (
    <ViewLayoutProvider view={layout}>
      <UserSessionProvider user={userSession}>
        <UserProfileProvider user={userProfile}>
          <Layout style={{ minHeight: "100dvh" }}>
            <HeaderLayout />
            <UserFound />
            <FooterLayout />
          </Layout>
        </UserProfileProvider>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
