// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// File: filter/page.tsx
// Description: Shows 9 filtered students (3×3) using RandomUser API.

import StudentGrid from "../../components/StudentGrid";

type SearchParams = {
  gender?: string;
};

type ApiUser = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
};

export const dynamic = "force-dynamic";

export default async function FilterPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  // Read gender parameter from URL (default: female)
  const gender = searchParams?.gender ?? "female";

  // Build API request URL using gender filter
  const url = `https://randomuser.me/api/?results=9&gender=${gender}`;

  // Fetch until we collect 9 unique students (avoid duplicates)
  const uniqueResults: ApiUser[] = [];
  const seenEmails = new Set<string>();

  for (let i = 0; i < 5 && uniqueResults.length < 9; i++) {
    const res = await fetch(url);
    const data = await res.json();

    for (const user of data.results) {
      if (!seenEmails.has(user.email)) {
        seenEmails.add(user.email);
        uniqueResults.push(user);
      }
      if (uniqueResults.length === 9) break;
    }
  }

  // Convert API users into internal student objects
  const students = uniqueResults.slice(0, 9).map((user: ApiUser, index: number) => ({
    id: user.email || index,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    imageUrl: user.picture.large,
  }));

  // Split students into 3 groups for display
  const design = students.slice(0, 3);
  const digitalEngineering = students.slice(3, 6);
  const geodataScience = students.slice(6, 9);

  return (
    <section>
      {/* HERO */}
      <div className="hero">
        <h1 className="hero-title">Filtered Students</h1>

        <div className="hero-sub">
          <div>
            <p className="hero-left-small">Filter Applied</p>
            <h3 className="hero-left-title">
              Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </h3>
          </div>

          <p className="hero-right-text">
            These results show students filtered by the selected criteria from the Random User API.
          </p>
        </div>
      </div>

      {/* BLOCK 1 */}
      <h2 className="major-title">Computer Science and Design</h2>
      <StudentGrid students={design} />

      {/* BLOCK 2 */}
      <h2 className="major-title">Digital Engineering</h2>
      <StudentGrid students={digitalEngineering} />

      {/* BLOCK 3 */}
      <h2 className="major-title">Geodata Science</h2>
      <StudentGrid students={geodataScience} />
    </section>
  );
}