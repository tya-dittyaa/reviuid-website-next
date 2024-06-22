import "@fontsource/poppins";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  return {
    title: {
      default: "Administator",
      template: "%s • Reviu.ID",
    },
    description: "Administator Reviu.ID",
    openGraph: {
      title: {
        default: "Administator",
        template: "%s • Reviu.ID",
      },
      description: "Administator Reviu.ID",
      url: `${FRONTEND_URL}/film`,
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
