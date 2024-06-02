import { GetUserProfile } from "@/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const response = await GetUserProfile(params.username);

  if (typeof response !== "number") {
    return {
      title: "Pengaturan Akun",
      description: "Keluar dari akun Reviu.ID.",
    };
  }

  return {
    title: `Pengguna Tidak Ditemukan`,
    description: "Halaman yang Anda cari tidak ditemukan.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
