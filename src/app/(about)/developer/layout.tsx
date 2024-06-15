import "@fontsource/poppins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Pengembang",
  description: "Daftar pengembang yang terlibat dalam pengembangan Reviu.ID.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
