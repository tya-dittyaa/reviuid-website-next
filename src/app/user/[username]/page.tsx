"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { useWindowSize } from "@/hooks";
import { UserProfile, ViewType } from "@/types";
import { GetUserProfile } from "@/utils";
import {
  ArrowLeftOutlined,
  HomeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Layout,
  Spin,
  Typography,
} from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

function UserNotFound({ errorResponse }: { errorResponse: string }) {
  return (
    <Content
      style={{
        flex: 1,
        backgroundColor: "#9E140F",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <WarningOutlined
        style={{ fontSize: 60, color: "#fff", marginBottom: 15 }}
      />
      <Text style={{ fontSize: 25, justifyContent: "center", color: "#fff" }}>
        Kesalahan Tidak Terduga
      </Text>
      <Text style={{ fontSize: 15, justifyContent: "center", color: "#fff" }}>
        {errorResponse}
      </Text>
      <Button
        type="primary"
        shape="round"
        icon={<HomeOutlined />}
        size={"large"}
        style={{ marginTop: 25, backgroundColor: "#E2B808", color: "black" }}
        href="/"
      >
        Kembali ke Beranda
      </Button>
    </Content>
  );
}

function DisplayUserVertical({ user }: { user: UserProfile }) {
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
          size={75}
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

        <Title level={4}>{user.username}</Title>

        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </Flex>
    </>
  );
}

function DisplayUserHorizontal({ user }: { user: UserProfile }) {
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

function ButtonBackAndProfile({ layout }: { layout: ViewType }) {
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
        <Button
          type="primary"
          shape="circle"
          size={layout === "horizontal" ? "large" : "middle"}
          href="/"
          icon={<ArrowLeftOutlined />}
          style={{
            backgroundColor: "#E2B808",
            color: "black",
          }}
        />
        <Text
          strong
          style={{
            color: "#E2B808",
            fontSize: layout === "horizontal" ? 30 : 20,
            marginLeft: layout === "horizontal" ? 30 : 15,
            marginRight: layout === "horizontal" ? 30 : 15,
          }}
        >
          |
        </Text>
        <Text
          strong
          style={{
            color: "#E2B808",
            fontSize: layout === "horizontal" ? 30 : 20,
          }}
        >
          <b style={{ fontWeight: "bold" }}>Profil User</b>
        </Text>
      </Col>
    </Flex>
  );
}

function UserFound({ layout, user }: { layout: ViewType; user: UserProfile }) {
  return (
    <Content
      style={{
        flex: 1,
        backgroundColor: "#9E140F",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
      }}
    >
      <ButtonBackAndProfile layout={layout} />

      <Divider
        orientation="center"
        style={{ borderColor: "black", borderWidth: 2 }}
      />

      {layout === "vertical" ? (
        <DisplayUserVertical user={user} />
      ) : (
        <DisplayUserHorizontal user={user} />
      )}

      <Divider
        orientation="center"
        style={{ borderColor: "black", borderWidth: 2 }}
      />
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
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [errorResponse, setErrorResponse] = useState<string>("");

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
      if (typeof response === "string") {
        setErrorResponse(response);
        return;
      }
      setUserData(response);
      return;
    };
    getUserData();
  }, [params.username]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (!userData) {
    return (
      <Layout style={{ minHeight: "100dvh" }}>
        <HeaderLayout />
        <UserNotFound errorResponse={errorResponse} />
        <FooterLayout />
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <HeaderLayout />
      <UserFound layout={layout} user={userData} />
      <FooterLayout />
    </Layout>
  );
}
