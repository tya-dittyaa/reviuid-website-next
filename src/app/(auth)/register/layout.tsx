import "@fontsource/poppins";
import { App } from "antd";
import type { Metadata } from "next";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export const metadata: Metadata = {
  title: "Daftar",
  description: "Daftar akun Reviu.ID untuk melanjutkan.",
  openGraph: {
    title: "Daftar » Reviu.ID",
    description: "Daftar akun Reviu.ID untuk melanjutkan.",
    url: `${FRONTEND_URL}/register`,
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
    <App>
      <section>{children}</section>
    </App>
  );
}
