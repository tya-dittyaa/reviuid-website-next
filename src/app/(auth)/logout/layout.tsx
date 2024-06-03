import "@fontsource/poppins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keluar",
  description: "Keluar dari akun Reviu.ID.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
