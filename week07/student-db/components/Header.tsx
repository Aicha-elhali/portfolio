import Link from "next/link";

export default function Header() {
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
