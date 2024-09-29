import "@fontsource/poppins";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  return {
    title: "Masuk",
    description: "Masuk ke akun Reviu.ID",
    openGraph: {
      title: "Masuk",
      description: "Masuk ke akun Reviu.ID",
      url: `${FRONTEND_URL}/login`,
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
