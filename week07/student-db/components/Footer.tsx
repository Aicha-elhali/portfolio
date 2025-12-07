// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// Semester: 3rd Semester
// File: components/Footer.tsx
// Description: Footer component displaying copyright and current date/time.


export default function Footer() {
  // Get current date and time
  const now = new Date();

  // Format timestamp in German locale
  const formatted = now.toLocaleString("de-DE", {
    dateStyle: "long",
    timeStyle: "medium",
  });

  // Render footer with timestamp
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        © {new Date().getFullYear()} Studio X — Aufgerufen am {formatted}
      </div>
    </footer>
  );
}