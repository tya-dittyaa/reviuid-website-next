"use client";

import { DividerCenter, FooterLayout, HeaderLayout } from "@/components";
import {
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { Developer, UserSession } from "@/types";
import { GetUserSession } from "@/utils";
import { TeamOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Flex, Image, Layout, Spin, Typography } from "antd";
import { useEffect, useState } from "react";

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

const DeveloperPeople: Developer[] = [
  {
    name: "ADITYA FAJRI",
    binusianId: "2602113205",
    email: "aditya.fajri001@binus.ac.id",
    avatar:
      "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/c8774b5b-f6ab-4917-b9ad-b88d4a392b8b.jpg",
    role: [
      "Backend Developer",
      "Database Administrator",
      "System Administrator",
    ],
  },
  {
    name: "KARINA DWINOVERA MULIA",
    binusianId: "2602099680",
    email: "karina.mulia@binus.ac.id",
    avatar:
      "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/8474ba8e-4cfa-4b78-b6ad-f7c086e3376b.jpg",
    role: ["Frontend Developer", "Backend Developer"],
  },
  {
    name: "LUKE MANGALA SOEGIANTO",
    binusianId: "2602090196",
    email: "luke.soegianto@binus.ac.id",
    avatar:
      "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/45f6c575-e5e3-4948-8971-819dce8d4511.jpg",
    role: ["UI/UX Designer", "Frontend Developer"],
  },
  {
    name: "PIERRE ADRIAN TIOPAN OCTAVIANU SITORUS",
    binusianId: "2602179284",
    email: "pierre.sitorus@binus.ac.id",
    avatar:
      "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/1c9cd390-b9a1-41cc-962b-327c08c89976.jpg",
    role: ["UI/UX Designer", "Frontend Developer"],
  },
  {
    name: "TIMOTHY PAENDONG",
    binusianId: "2602110941 ",
    email: "timothy.paendong@binus.ac.id",
    avatar:
      "https://stbm7resourcesprod.blob.core.windows.net/profilepicture/a1f31845-6f13-4b1e-86e7-605853e6f2b3.jpg",
    role: ["Team Leader", "Frontend Developer"],
  },
];

function DeveloperCard({ developer }: { developer: Developer }) {
  const layout = useViewLayout();

  return (
    <Card
      hoverable
      style={{
        width: layout === "vertical" ? "100%" : 600,
        background: "#E2E0D8",
      }}
      styles={{ body: { padding: 0, overflow: "hidden" } }}
    >
      <Flex
        vertical={layout === "vertical" ? true : false}
        gap={25}
        style={{ padding: "1rem" }}
      >
        <Col
          flex={layout === "vertical" ? "auto" : "100px"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            preview={false}
            alt={`${developer.name} avatar`}
            src={developer.avatar}
            width={150}
            height={150}
            style={{
              borderRadius: 10,
              width: layout === "vertical" ? "100%" : 150,
              height: 150,
              objectFit: "cover",
            }}
          />
        </Col>
        <Col
          flex="auto"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            {developer.name}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            {developer.email}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            {developer.binusianId}
          </Title>
          <Paragraph>
            {developer.role.map((role, index) => (
              <Text key={index} style={{ margin: 0 }}>
                {role}
                {index !== developer.role.length - 1 && ", "}
              </Text>
            ))}
          </Paragraph>
        </Col>
      </Flex>
    </Card>
  );
}

function DeveloperList() {
  return (
    <Flex
      wrap
      gap={25}
      justify="center"
      align="center"
      style={{ width: "100%" }}
    >
      {DeveloperPeople.map((developer, index) => (
        <DeveloperCard key={index} developer={developer} />
      ))}
    </Flex>
  );
}

function DeveloperText() {
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
          icon={<TeamOutlined />}
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
          Daftar Pengembang
        </Title>
      </Col>
    </Flex>
  );
}

function ContentLayout() {
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
      <DeveloperText />
      <DividerCenter />
      <DeveloperList />
    </Content>
  );
}

export default function DeveloperPage() {
  const size = useWindowSize();

  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const getUserSession = async () => {
    const user = await GetUserSession();
    setUserSession(user);
    setIsLoading(false);
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
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <ViewLayoutProvider view={layout}>
      <UserSessionProvider user={userSession}>
        <Layout style={{ minHeight: "100dvh" }}>
          <HeaderLayout />
          <ContentLayout />
          <FooterLayout />
        </Layout>
      </UserSessionProvider>
    </ViewLayoutProvider>
  );
}
