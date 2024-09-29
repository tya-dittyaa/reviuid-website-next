import "@fontsource/poppins";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!;

  return {
    title: "Lupa Kata Sandi",
    description:
      "Lupa kata sandi akun Reviu.ID? Atur ulang kata sandi Anda di sini.",
    openGraph: {
      title: "Lupa Kata Sandi",
      description:
        "Lupa kata sandi akun Reviu.ID? Atur ulang kata sandi Anda di sini.",
      url: `${FRONTEND_URL}/forgot-password`,
      siteName: "Reviu.ID",
      images: [
        {
          url: `${FRONTEND_URL}/logo.png`,
          alt: "Reviu.ID",
          width: 512,
          height: 512,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
