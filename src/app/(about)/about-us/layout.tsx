import "@fontsource/poppins";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  return {
    title: "Tentang Kami",
    description: "Temukan informasi tentang Reviu.ID",
    openGraph: {
      title: "Tentang Kami",
      description: "Temukan informasi tentang Reviu.ID",
      url: `${FRONTEND_URL}/about-us`,
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
  return <section>{children}</section>;
}
