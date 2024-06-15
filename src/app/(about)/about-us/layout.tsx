import "@fontsource/poppins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Temukan informasi tentang Reviu.ID di sini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
