import { GetFilmData } from "@/utils";
import "@fontsource/poppins";
import { Metadata } from "next";

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
    };
  }

  return {
    title: {
      default: `${response.title}`,
      template: "%s » Reviu.ID",
    },
    description: response.synopsis,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
