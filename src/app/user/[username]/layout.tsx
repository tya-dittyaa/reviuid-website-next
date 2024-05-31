import { GetUserProfile } from "@/utils";
import "@fontsource/poppins";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const response = await GetUserProfile(params.username);

  if (typeof response !== "string") {
    return {
      title: response.username,
      description: response.biography,
    };
  }

  return {
    title: `Profil tidak ditemukan!`,
    description: "Profil yang dicari tidak ditemukan!",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
