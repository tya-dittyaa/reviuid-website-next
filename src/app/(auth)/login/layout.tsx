import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@fontsource/poppins";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun Reviu.ID untuk melanjutkan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins",
          },
        }}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </section>
  );
}
