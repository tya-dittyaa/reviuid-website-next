import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@fontsource/poppins";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import "./globals.css";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export const metadata: Metadata = {
  title: {
    default: "Reviu.ID",
    template: "%s » Reviu.ID",
  },
  description: "Halaman Utama Reviu.ID",
  openGraph: {
    title: "Reviu.ID",
    description: "Berbagi Cerita, Menikmati Karya Film Indonesia!",
    url: FRONTEND_URL,
    siteName: "Reviu.ID",
    images: [
      {
        url: `${FRONTEND_URL}/logo.png`,
        alt: "Reviu.ID",
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
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
          components: {
            Button: {
              colorPrimary: "#E2B808",
              colorPrimaryHover: "#CC9F07",
              colorPrimaryActive: "#B38A06",
              colorTextDisabled: "#B3B3B3",
              fontWeight: "bold",
            },
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
