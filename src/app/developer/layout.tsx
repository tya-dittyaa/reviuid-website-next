import "@fontsource/poppins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Developers",
  description: "Meet the team behind Reviu.ID.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
