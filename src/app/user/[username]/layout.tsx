import { GetUserProfile } from "@/utils";
import "@fontsource/poppins";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const response = await GetUserProfile(params.username);

  if (typeof response !== "number") {
    return {
      title: {
        default: `${response.username}`,
        template: "%s » Reviu.ID",
      },
      description: response.biography,
    };
  }

  return {
    title: {
      default: `Pengguna Tidak Ditemukan`,
      template: "%s » Reviu.ID",
    },
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
