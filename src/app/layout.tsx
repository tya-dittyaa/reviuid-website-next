import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@fontsource/poppins";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Reviu.ID",
    template: "%s » Reviu.ID",
  },
  description: "Halaman utama Reviu.ID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins",
          },
        }}
      >
        <AntdRegistry>
          <body>{children}</body>
        </AntdRegistry>
      </ConfigProvider>
    </html>
  );
}
