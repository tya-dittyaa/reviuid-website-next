import "@fontsource/poppins";
import { App } from "antd";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  return {
    title: "Daftar",
    description: "Daftar akun Reviu.ID",
    openGraph: {
      title: "Daftar",
      description: "Daftar akun Reviu.ID",
      url: `${FRONTEND_URL}/register`,
      siteName: "Reviu.ID",
      images: [
        {
          url: `${FRONTEND_URL}/logo.png`,
          alt: "Reviu.ID",
          width: 512,
          height: 512,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
  };
}

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
