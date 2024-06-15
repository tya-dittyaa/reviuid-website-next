import "@fontsource/poppins";
import type { Metadata } from "next";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Temukan informasi tentang Reviu.ID di sini.",
  openGraph: {
    title: "Tentang Kami » Reviu.ID",
    description: "Temukan informasi tentang Reviu.ID di sini.",
    url: `${FRONTEND_URL}/about-us`,
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
