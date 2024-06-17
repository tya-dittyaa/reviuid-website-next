import "@fontsource/poppins";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  return {
    title: "Daftar Pengembang",
    description: "Daftar Pengembang yang berkontribusi pada Reviu.ID",
    openGraph: {
      title: "Daftar Pengembang",
      description: "Daftar Pengembang yang berkontribusi pada Reviu.ID",
      url: `${FRONTEND_URL}/developers`,
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
