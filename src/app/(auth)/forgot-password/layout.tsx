import "@fontsource/poppins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi",
  description:
    "Lupa kata sandi akun Reviu.ID? Atur ulang kata sandi Anda di sini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
