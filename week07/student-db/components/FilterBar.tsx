"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGender = searchParams.get("gender") ?? "all";

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    if (value === "all") {
      router.push("/students");
    } else {
      router.push(`/students?gender=${value}`);
    }
  }

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