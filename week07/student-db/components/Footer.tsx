"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [loadedAt, setLoadedAt] = useState<string>("");

  useEffect(() => {
    const now = new Date().toLocaleString();
    setLoadedAt(now);
  }, []);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        © 2025 Student Database · Page loaded at {loadedAt}
      </div>
    </footer>
  );
}