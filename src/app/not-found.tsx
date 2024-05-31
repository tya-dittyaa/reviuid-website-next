"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { HomeOutlined, WarningOutlined } from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, ConfigProvider, Layout, Typography } from "antd";

const { Content } = Layout;
const { Text } = Typography;

function NotFoundView() {
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
        textAlign: "center",
      }}
    >
      <WarningOutlined
        style={{ fontSize: 75, color: "#fff", marginBottom: 15 }}
      />
      <Text style={{ fontSize: 30, color: "#fff" }}>
        Maaf, halaman ini tidak tersedia.
      </Text>
      <Text style={{ fontSize: 15, color: "#fff" }}>
        Tautan yang Anda ikuti mungkin rusak, atau halaman tersebut mungkin
        telah dihapus.
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

export default function NotFound() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
        },
      }}
    >
      <AntdRegistry>
        <Layout style={{ minHeight: "100dvh" }}>
          <HeaderLayout />
          <NotFoundView />
          <FooterLayout />
        </Layout>
      </AntdRegistry>
    </ConfigProvider>
  );
}
