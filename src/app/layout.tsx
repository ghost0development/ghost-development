import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis";
import Script from "next/script";

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
  title: {
    default: "Ghost Development — Tworzenie stron i aplikacji | Szczecin",
    template: "%s | Ghost Development",
  },
  description: "Solo developer z Szczecina. Projektowanie i wdrażanie nowoczesnych stron internetowych, aplikacji webowych i desktopowych. React, TypeScript, Python, Supabase.",
  keywords: ["solo developer Szczecin", "tworzenie stron internetowych", "aplikacje webowe", "ghost development", "programista Szczecin"],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Ghost Development — Tworzenie stron i aplikacji | Szczecin",
    description: "Solo developer z Szczecina. Strony internetowe, aplikacje webowe i desktopowe.",
    url: "https://ghost0development.github.io/ghost-development/",
    siteName: "Ghost Development",
    images: [{ url: "/logo.webp", width: 300, height: 300 }],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ghost Development — Tworzenie stron i aplikacji | Szczecin",
    description: "Solo developer z Szczecina. Strony internetowe, aplikacje webowe i desktopowe.",
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
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
      <body>
        <LenisProvider>{children}</LenisProvider>
        <Script id="schema" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Saylo",
            jobTitle: "Solo Developer",
            description: "Projektowanie i wdrażanie nowoczesnych stron internetowych, aplikacji webowych i desktopowych.",
            url: "https://ghost0development.github.io/ghost-development/",
            address: { "@type": "PostalAddress", addressLocality: "Szczecin", addressCountry: "PL" },
          }),
        }} />
      </body>
    </html>
  );
}
