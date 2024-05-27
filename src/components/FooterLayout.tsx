import { useWindowSize } from "@/hooks";
import {
  DiscordOutlined,
  FacebookOutlined,
  InstagramOutlined,
  XOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Space, Typography } from "antd";
import { useEffect, useState } from "react";

const { Footer } = Layout;
const { Text, Link } = Typography;

function Vertical() {
  return (
    <Flex
      vertical
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Space
        direction="horizontal"
        style={{ margin: "10px 0 10px 0", gap: 40 }}
      >
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          <InstagramOutlined style={{ fontSize: 35 }} />
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          <XOutlined style={{ fontSize: 35 }} />{" "}
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          <FacebookOutlined style={{ fontSize: 35 }} />{" "}
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          <DiscordOutlined style={{ fontSize: 35 }} />{" "}
        </Link>
      </Space>

      <Space
        direction="horizontal"
        style={{
          margin: "10px 0 10px 0",
          gap: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Space direction="vertical">
          <Link
            href="#"
            style={{ color: "white", listStyle: "none", fontSize: "15px" }}
          >
            Bantuan
          </Link>
          <Link
            href="#"
            style={{ color: "white", listStyle: "none", fontSize: "15px" }}
          >
            Tentang Kami
          </Link>
          <Link
            href="#"
            style={{ color: "white", listStyle: "none", fontSize: "15px" }}
          >
            Kondisi Penggunaan
          </Link>
          <Link
            href="#"
            style={{ color: "white", listStyle: "none", fontSize: "15px" }}
          >
            Kebijakan Privasi
          </Link>
        </Space>
        <Space direction="vertical" style={{}}>
          <Link
            href="#"
            style={{ color: "white", listStyle: "none", fontSize: "15px" }}
          >
            Developer Reviu.ID
          </Link>
          <Link
            href="#"
            style={{ color: "white", listStyle: "none", fontSize: "15px" }}
          >
            Pilihan Privasi Iklan
          </Link>
          <Link
            href="#"
            style={{ color: "white", listStyle: "none", fontSize: "15px" }}
          >
            Periklanan
          </Link>
        </Space>
      </Space>

      <Space
        direction="horizontal"
        style={{ margin: "10px 0 10px 0", gap: 40 }}
      >
        <Text style={{ color: "white" }}>© 2024, oleh Reviu Film ID, Inc.</Text>
      </Space>
    </Flex>
  );
}

function Horizontal() {
  return (
    <Flex
      vertical
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Space
        direction="horizontal"
        style={{ margin: "10px 0 10px 0", gap: 40 }}
      >
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          <InstagramOutlined style={{ fontSize: 35 }} />
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          <XOutlined style={{ fontSize: 35 }} />{" "}
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          <FacebookOutlined style={{ fontSize: 35 }} />{" "}
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          <DiscordOutlined style={{ fontSize: 35 }} />{" "}
        </Link>
      </Space>

      <Space direction="horizontal" style={{ margin: "10px 0 5px 0", gap: 40 }}>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          Bantuan
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          Tentang Kami
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          Kondisi Penggunaan
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          Kebijakan Privasi
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          Periklanan
        </Link>
      </Space>

      <Space direction="horizontal" style={{ margin: "5px 0 10px 0", gap: 40 }}>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          Developer Reviu.ID
        </Link>
        <Link href="#" style={{ color: "white", listStyle: "none" }}>
          Pilihan Privasi Iklan
        </Link>
      </Space>

      <Space
        direction="horizontal"
        style={{ margin: "10px 0 10px 0", gap: 40 }}
      >
        <Text style={{ color: "white" }}>© 2024, oleh Reviu Film ID, Inc.</Text>
      </Space>
    </Flex>
  );
}

export default function FooterLayout() {
  const size = useWindowSize();
  const [value, setValue] = useState<"vertical" | "horizontal">("horizontal");

  useEffect(() => {
    if (size.width && size.width < 800) {
      setValue("vertical");
    } else {
      setValue("horizontal");
    }
  }, [size]);

  return (
    <Footer
      style={{
        backgroundColor: "black",
        position: "fixed",
        bottom: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      {value === "vertical" ? <Vertical /> : <Horizontal />}
    </Footer>
  );
}
