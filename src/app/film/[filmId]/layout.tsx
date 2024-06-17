import { GetFilmData } from "@/utils";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: Readonly<{
  params: { filmId: string };
}>): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;
  const { filmId } = params;

  const filmData = await GetFilmData(filmId);

  if (!filmData) {
    return {
      title: "Film Tidak Ditemukan",
      description: "Film yang dicari tidak ditemukan",
      openGraph: {
        title: "Film Tidak Ditemukan",
        description: "Film yang dicari tidak ditemukan",
        url: `${FRONTEND_URL}/film/${filmId}`,
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
    title: filmData.title,
    description: filmData.synopsis,
    openGraph: {
      title: filmData.title,
      description: filmData.synopsis,
      url: `${FRONTEND_URL}/film/${filmId}`,
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
