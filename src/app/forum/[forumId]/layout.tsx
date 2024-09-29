import { GetForumParentById } from "@/utils";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: Readonly<{
  params: { forumId: string };
}>): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;
  const { forumId } = params;

  const forumData = await GetForumParentById(forumId);

  if (!forumData) {
    return {
      title: "Forum Tidak Ditemukan",
      description: "Forum yang dicari tidak ditemukan",
      openGraph: {
        title: "Forum Tidak Ditemukan",
        description: "Forum yang dicari tidak ditemukan",
        url: `${FRONTEND_URL}/forum/${forumId}`,
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

  return {
    title: "Forum Diskusi",
    description: forumData.title,
    openGraph: {
      title: "Forum Diskusi",
      description: `${forumData.user.username} memulai diskusi di forum "${forumData.title}"`,
      url: `${FRONTEND_URL}/forum/${forumId}`,
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
