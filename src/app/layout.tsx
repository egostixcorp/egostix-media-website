import type { Metadata } from "next";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { Inter, Playfair_Display, Space_Mono } from "next/font/google";
import { IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Egostix Media — Where Imagination Meets Intelligence",
  description:
    "Egostix Media blends AI, creativity, and engineering to craft intelligent content and next-generation media systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className=" bg-white text-black font-inter">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
