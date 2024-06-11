import "@fontsource/poppins";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: `Daftar Film`,
    template: "%s » Reviu.ID",
  },
  description: "Daftar film yang tersedia di Reviu.ID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
