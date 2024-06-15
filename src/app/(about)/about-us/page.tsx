"use client";

import { DividerCenter, FooterLayout, HeaderLayout } from "@/components";
import {
  UserSessionProvider,
  ViewLayoutProvider,
  useViewLayout,
} from "@/context";
import { useWindowSize } from "@/hooks";
import { UserSession } from "@/types";
import { GetUserSession } from "@/utils";
import { CaretRightOutlined, VideoCameraOutlined } from "@ant-design/icons";
import {
  Avatar,
  Col,
  Collapse,
  CollapseProps,
  Flex,
  Image,
  Layout,
  Spin,
  Typography,
} from "antd";
import { CSSProperties, useEffect, useState } from "react";

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

function TaglineImage() {
  return (
    <Image
      src="/tagline.png"
      alt="Tagline"
      preview={false}
      style={{
        width: "100%",
        height: "auto",
        margin: 0,
        padding: 0,
        borderRadius: 10,
      }}
    />
  );
}

function BodyLayout() {
  const getItemsNested: CollapseProps["items"] = [
    {
      key: "3.1",
      label: (
        <Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          Komunitas yang Aktif
        </Title>
      ),
      children: (
        <Paragraph
          style={{
            fontSize: 16,
          }}
        >
          Bergabunglah dengan ribuan pengguna lain yang memiliki minat yang sama
          dalam dunia perfilman Indonesia. Baca ulasan dari perspektif yang
          berbeda dan temukan film-film baru untuk ditonton.
        </Paragraph>
      ),
    },
    {
      key: "3.2",
      label: (
        <Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          Akses Mudah
        </Title>
      ),
      children: (
        <Paragraph
          style={{
            fontSize: 16,
          }}
        >
          Platform kami dirancang untuk memberikan kemudahan akses di berbagai
          perangkat, baik itu smartphone, tablet, maupun desktop.
        </Paragraph>
      ),
    },
    {
      key: "3.3",
      label: (
        <Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          Ulasan yang Jujur dan Terpercaya
        </Title>
      ),
      children: (
        <Paragraph
          style={{
            fontSize: 16,
          }}
        >
          Kami mengutamakan kejujuran dan transparansi dalam setiap ulasan yang
          dipublikasikan. Setiap pengguna memiliki kesempatan untuk memberikan
          penilaian mereka sendiri yang membantu orang lain dalam membuat
          keputusan tontonan.
        </Paragraph>
      ),
    },
  ];

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: (
        <Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          Apa itu Reviu.ID?
        </Title>
      ),
      children: (
        <Paragraph
          style={{
            fontSize: 16,
          }}
        >
          Reviu.ID adalah sebuah aplikasi review film Indonesia. Seiring dengan
          pesatnya perkembangan teknologi internet, aplikasi web semakin
          membantu dalam pengiriman, penyampaian, dan penerimaan informasi.
          ReviuID memanfaatkan tren ini untuk memberikan platform bagi para
          penggemar film Indonesia untuk berbagi ulasan dan pandangan mereka
          tentang karya seni yang mereka nikmati.
        </Paragraph>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: (
        <Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          Apa Misi Kami?
        </Title>
      ),
      children: (
        <Paragraph
          style={{
            fontSize: 16,
          }}
        >
          Misi kami adalah menjadi sumber terpercaya bagi ulasan film Indonesia
          dan mendukung industri perfilman lokal dengan memberikan platform yang
          transparan dan mudah diakses bagi semua orang. Kami berkomitmen untuk
          menghadirkan informasi yang akurat dan mendalam tentang film-film
          terbaru, serta memberikan kesempatan bagi pengguna kami untuk
          berkontribusi dengan ulasan mereka sendiri.
        </Paragraph>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: (
        <Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          Mengapa Memilih Kami?
        </Title>
      ),
      children: (
        <>
          <Paragraph
            style={{
              fontSize: 16,
            }}
          >
            Dengan pesatnya perkembangan teknologi internet, aplikasi web telah
            menjadi alat yang vital dalam pengiriman, penyampaian, dan
            penerimaan informasi. Reviu.ID memanfaatkan tren ini untuk
            menciptakan sebuah platform yang intuitif dan user-friendly. Berikut
            adalah beberapa alasan mengapa Anda harus memilih Reviu.ID:
          </Paragraph>
          <Collapse
            accordion
            size="large"
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ width: "100%", backgroundColor: "transparent" }}
            items={getItemsNested}
          />
        </>
      ),
      style: panelStyle,
    },
  ];

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "#E2E0D8",
    borderRadius: 10,
    border: "none",
  };

  return (
    <Flex
      vertical
      gap={15}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Collapse
        accordion
        size="large"
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ width: "100%", backgroundColor: "transparent" }}
        items={getItems(panelStyle)}
      />
    </Flex>
  );
}

function AboutUsText() {
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
          icon={<VideoCameraOutlined />}
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
          <b style={{ fontWeight: "bold" }}>Tentang Kami</b>
        </Text>
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
      <AboutUsText />
      <DividerCenter />

      <Flex
        vertical
        gap={20}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TaglineImage />
        <BodyLayout />
      </Flex>
    </Content>
  );
}

export default function AboutUsPage() {
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
