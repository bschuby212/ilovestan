import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

const futuraSub = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-futura-sub",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${futuraSub.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper-white text-obsidian">{children}</body>
    </html>
  );
}
