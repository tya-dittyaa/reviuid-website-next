import "@fontsource/poppins";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  return {
    title: "Forum Diskusi",
    description: "Forum Komunitas Reviu.ID untuk berdiskusi seputar film.",
    openGraph: {
      title: "Forum Diskusi",
      description: "Forum Komunitas Reviu.ID untuk berdiskusi seputar film.",
      url: `${FRONTEND_URL}/forum`,
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
