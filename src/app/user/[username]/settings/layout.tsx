import { GetUserProfile } from "@/utils";
import type { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export async function generateMetadata({
  params,
}: Readonly<{
  params: { username: string };
}>): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;
  const { username } = params;

  const user = await GetUserProfile(username);

  const openGraph: OpenGraph = {
    title: "Halaman Pengguna",
    description: "Berbagi Cerita, Menikmati Karya Film Indonesia!",
    url: FRONTEND_URL,
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
  };

  if (typeof user === "number") {
    return {
      title: `Pengguna Tidak Ditemukan`,
      description: "Halaman yang Anda cari tidak ditemukan.",
      openGraph,
    };
  }

  return {
    title: "Pengaturan Akun",
    description: "Pengaturan akun pengguna Reviu.ID.",
    openGraph,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
