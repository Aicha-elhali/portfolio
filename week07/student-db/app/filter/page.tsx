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
  const gender = searchParams?.gender ?? "female"; // default filter

  const url = `https://randomuser.me/api/?results=9&gender=${gender}`;

  const res = await fetch(url);
  const data = await res.json();

  const students = data.results.map((user: ApiUser, index: number) => ({
    id: user.email || index,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    imageUrl: user.picture.large,
  }));

  // Split into 3 groups like in Students page
  const design = students.slice(0, 3);
  const digitalEngineering = students.slice(3, 6);
  const geodataScience = students.slice(6, 9);

  return (
    <section>
      {/* HERO AREA FOR FILTER */}
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
            These results show students filtered by the selected criteria from
            the Random User API.
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