import "@fontsource/poppins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Reviu.ID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
