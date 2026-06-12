import type { Metadata } from "next";
import { Inter, Anton, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";


const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base URL used to resolve relative OG/Twitter image paths to absolute URLs.
  // Override with NEXT_PUBLIC_SITE_URL once a custom domain is set up.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicha-el-hali.pages.dev"),
  title: "Aicha El Hali - Portfolio",
  description: "Portfolio of Aicha El Hali - UX Design & Frontend Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${anton.variable} ${geistMono.variable}`}>
        <Providers>
          <SmoothScroll>
            <ScrollToTop />
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
