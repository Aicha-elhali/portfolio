// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// Semester: 3rd Semester
// File: page.tsx
// Description: Redirects the root route "/" to the Students page according to project structure.

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/students");
}