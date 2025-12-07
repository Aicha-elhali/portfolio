import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";

export const metadata = {
  title: "Student Database",
  description: "Browse our best students.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="page-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}