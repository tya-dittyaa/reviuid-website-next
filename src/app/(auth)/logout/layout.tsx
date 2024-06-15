import "@fontsource/poppins";
import type { Metadata } from "next";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export const metadata: Metadata = {
  title: "Keluar",
  description: "Keluar dari akun Reviu.ID.",
  openGraph: {
    title: "Keluar » Reviu.ID",
    description: "Keluar dari akun Reviu.ID.",
    url: `${FRONTEND_URL}/logout`,
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
  return <section>{children}</section>;
}
