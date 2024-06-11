import "@fontsource/poppins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forum",
  description: "Tempat berdiskusi mengenai dunia perfilman Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
