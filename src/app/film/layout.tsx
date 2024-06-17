import "@fontsource/poppins";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  return {
    title: {
      default: "Daftar Film",
      template: "%s • Reviu.ID",
    },
    description: "Daftar film yang tersedia di Reviu.ID",
    openGraph: {
      title: {
        default: "Daftar Film",
        template: "%s • Reviu.ID",
      },
      description: "Daftar film yang tersedia di Reviu.ID",
      url: `${FRONTEND_URL}/film`,
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
