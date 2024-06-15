import { GetFilmData } from "@/utils";
import { Metadata } from "next";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export async function generateMetadata({
  params,
}: {
  params: { filmId: string };
}): Promise<Metadata> {
  const response = await GetFilmData(params.filmId);

  if (!response) {
    return {
      title: {
        default: `Film Tidak Ditemukan`,
        template: "%s » Reviu.ID",
      },
      description: "Halaman yang Anda cari tidak ditemukan.",
      openGraph: {
        title: {
          default: `Film Tidak Ditemukan » Reviu.ID`,
          template: "%s » Reviu.ID",
        },
        description: "Halaman yang Anda cari tidak ditemukan.",
        url: `${FRONTEND_URL}/film/${params.filmId}`,
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
      default: `${response.title}`,
      template: "%s » Reviu.ID",
    },
    description: response.synopsis,
    openGraph: {
      title: {
        default: `${response.title} » Reviu.ID`,
        template: "%s » Reviu.ID",
      },
      description: response.synopsis,
      url: `${FRONTEND_URL}/film/${params.filmId}`,
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
