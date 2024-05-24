import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Daftar akun Reviu.ID untuk melanjutkan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
