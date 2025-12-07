// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// Semester: 3rd Semester
// File: students/page.tsx
// Description: Displays 9 students (3×3) grouped into three majors using RandomUser API.


import StudentGrid from "../../components/StudentGrid";

// Enable dynamic rendering for fresh API data on each request
export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  // Fetch 9 random users from the API
  const res = await fetch("https://randomuser.me/api/?results=9");
  const data = await res.json();

  // Convert API users into internal student objects
  const students = data.results.map((user, index) => ({
    id: user.email || index,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    imageUrl: user.picture.large,
  }));

  // Split the 9 students into three groups for display
  const design = students.slice(0, 3);
  const digitalEngineering = students.slice(3, 6);
  const geodataScience = students.slice(6, 9);

  // Render hero section and all three major groups
  return (
    <section>
      {/* HERO */}
      <div className="hero">
        <h1 className="hero-title">Browse through<br/>our best students.</h1>

        <div className="hero-sub">
          <div>
            <p className="hero-left-small">Discover the MUC.DAI Majors</p>
          </div>

          <p className="hero-right-text">
            Explore our students, their majors, and the diverse backgrounds 
            that shape our community.
          </p>
        </div>
      </div>

      {/* BLOCK 1 — DESIGN */}
      <h2 className="major-title">Computer Science and Design</h2>
      <StudentGrid students={design} />

      {/* BLOCK 2 — DIGITAL ENGINEERING */}
      <h2 className="major-title">Digital Engineering</h2>
      <StudentGrid students={digitalEngineering} />

      {/* BLOCK 3 — GEODATA SCIENCE */}
      <h2 className="major-title">Geodata Science</h2>
      <StudentGrid students={geodataScience} />
    </section>
  );
}