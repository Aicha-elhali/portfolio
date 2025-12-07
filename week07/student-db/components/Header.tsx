// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// Semester: 3rd Semester
// File: components/Header.tsx
// Description: Header component containing site navigation links.


import Link from "next/link";

export default function Header() {
  // Render header with logo and navigation menu
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-logo">Studio X</div>

        <nav className="site-nav">
          <Link href="/students">Students</Link>
          <Link href="/filter">Filter</Link>
          <Link href="/imprint">Imprint</Link>
        </nav>
      </div>
    </header>
  );
}
