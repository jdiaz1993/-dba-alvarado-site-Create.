import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Run Exterior Services",
  description:
    "Professional exterior services including gutter maintenance, solar panel cleaning, window washing, and more.",
  metadataBase: new URL("https://www.homerunexterior.com"),
  openGraph: {
    title: "Home Run Exterior Services",
    description:
      "Exterior cleaning pros for gutters, solar panels, windows, and more. Request your free quote today.",
    url: "https://www.homerunexterior.com",
    siteName: "Home Run Exterior Services",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-zinc-900 antialiased dark:bg-black dark:text-zinc-100`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 bg-white dark:bg-black">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
