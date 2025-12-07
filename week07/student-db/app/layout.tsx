// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// Semester: 3rd Semester
// File: layout.tsx
// Description: Root layout component providing global page structure including header, footer, and global styles.

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