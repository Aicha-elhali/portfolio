export default function Footer() {
  const now = new Date();

  // Format: 7. Dezember 2025 um 16:45:12
  const formatted = now.toLocaleString("de-DE", {
    dateStyle: "long",
    timeStyle: "medium",
  });

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        © {new Date().getFullYear()} Studio X — Aufgerufen am {formatted}
      </div>
    </footer>
  );
}