import "@fontsource/poppins";
import type { Metadata } from "next";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun Reviu.ID untuk melanjutkan.",
  openGraph: {
    title: "Masuk » Reviu.ID",
    description: "Masuk ke akun Reviu.ID untuk melanjutkan.",
    url: `${FRONTEND_URL}/login`,
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
