import { useWindowSize } from "@/hooks";
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
        style={{
          gap: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Space direction="vertical">
          <Link href="/about-us" style={{ color: "white", listStyle: "none" }}>
            Tentang Kami
          </Link>
        </Space>
        <Space direction="vertical">
          <Link
            href="/developers"
            style={{ color: "white", listStyle: "none" }}
          >
            Developers
          </Link>
        </Space>
      </Space>

      <Space direction="horizontal" style={{ marginTop: 10 }}>
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
      <Space direction="horizontal" style={{ gap: 50 }}>
        <Text style={{ color: "white" }}>© 2024, oleh Reviu Film ID, Inc.</Text>
        <Link href="/about-us" style={{ color: "white", listStyle: "none" }}>
          Tentang Kami
        </Link>
        <Link href="/developer" style={{ color: "white", listStyle: "none" }}>
          Developer
        </Link>
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
  }, [size.width]);

  return (
    <Footer
      style={{
        flexShrink: 1,
        backgroundColor: "black",
        bottom: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      {value === "vertical" ? <Vertical /> : <Horizontal />}
    </Footer>
  );
}
