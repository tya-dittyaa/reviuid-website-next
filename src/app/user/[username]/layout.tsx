import { GetUserProfile } from "@/utils";
import "@fontsource/poppins";
import { Metadata } from "next";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const response = await GetUserProfile(params.username);

  if (typeof response === "number") {
    return {
      title: {
        default: `Pengguna Tidak Ditemukan`,
        template: "%s » Reviu.ID",
      },
      description: "Halaman yang Anda cari tidak ditemukan.",
      openGraph: {
        title: {
          default: `Pengguna Tidak Ditemukan » Reviu.ID`,
          template: "%s » Reviu.ID",
        },
        description: "Halaman yang Anda cari tidak ditemukan.",
        url: `${FRONTEND_URL}/user/${params.username}`,
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

  return {
    title: {
      default: `${response.username}`,
      template: "%s » Reviu.ID",
    },
    description: response.biography || "Tidak ada deskripsi.",
    openGraph: {
      title: {
        default: `${response.username} » Reviu.ID`,
        template: "%s » Reviu.ID",
      },
      description: response.biography || "Tidak ada deskripsi.",
      url: `${FRONTEND_URL}/user/${params.username}`,
      siteName: "Reviu.ID",
      images: [
        {
          url: response.avatar || `${FRONTEND_URL}/logo.png`,
          alt: response.username,
          width: 800,
          height: 600,
        },
      ],
      locale: "id_ID",
      type: "profile",
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
