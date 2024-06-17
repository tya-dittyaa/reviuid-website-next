import { GetUserProfile } from "@/utils";
import "@fontsource/poppins";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: Readonly<{
  params: { username: string };
}>): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;
  const { username } = params;

  const user = await GetUserProfile(username);

  if (typeof user === "number") {
    return {
      title: {
        default: "Pengguna Tidak Ditemukan",
        template: "%s • Reviu.ID",
      },
      description: "Pengguna yang dicari tidak ditemukan",
      openGraph: {
        title: {
          default: "Pengguna Tidak Ditemukan",
          template: "%s • Reviu.ID",
        },
        description: "Pengguna yang dicari tidak ditemukan",
        url: `${FRONTEND_URL}/user/${username}`,
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
      default: user.username,
      template: "%s • Reviu.ID",
    },
    description: user.biography || "Tidak ada deskripsi pengguna",
    openGraph: {
      title: {
        default: user.username,
        template: "%s • Reviu.ID",
      },
      description: user.biography || "Tidak ada deskripsi pengguna",
      url: `${FRONTEND_URL}/user/${username}`,
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
