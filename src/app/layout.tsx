import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ghost0development.github.io/ghost-development/"),
  title: "Ghost Development — Nowa Generacja Oprogramowania",
  description: "Ghost Development to elitarny software house specjalizujący się w nowoczesnych, skalowalnych rozwiązaniach backendowych i webowych.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Ghost Development — Nowa Generacja Oprogramowania",
    description: "Software House · Szczecin",
    url: "https://ghost0development.github.io/ghost-development/",
    siteName: "Ghost Development",
    images: [{ url: "/logo.webp", width: 300, height: 300 }],
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body><LenisProvider>{children}</LenisProvider></body>
    </html>
  );
}
