// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// Semester: 3rd Semester
// File: components/FilterBar.tsx
// Description: Client-side gender filter component using URL parameters.


"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

export default function FilterBar() {
  // Get router instance for navigation updates
  const router = useRouter();
  // Read current URL search parameters
  const searchParams = useSearchParams();
  const currentGender = searchParams.get("gender") ?? "all";

  // Handle dropdown selection and update URL filter
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value === "all") {
      router.push("/students");
    } else {
      router.push(`/students?gender=${value}`);
    }
  }

  // Render filter dropdown UI
  return (
    <div className="filter-bar">
      <label>
        Filter by gender:
        <select value={currentGender} onChange={handleChange}>
          <option value="all">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </label>
    </div>
  );
}