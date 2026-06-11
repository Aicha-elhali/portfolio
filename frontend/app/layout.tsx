import type { Metadata } from "next";
import { Inter, Anton, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";
import SmoothScroll from "./components/SmoothScroll";


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
  // TODO: set NEXT_PUBLIC_SITE_URL to your production domain when you deploy.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Aicha El Hali - Portfolio",
  description: "Portfolio von Aicha El Hali - UX Design & Frontend Development",
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
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
