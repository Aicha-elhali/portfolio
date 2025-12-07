import StudentGrid from "../../components/StudentGrid";

type ApiUser = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
};

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const res = await fetch("https://randomuser.me/api/?results=9");
  const data = await res.json();

  const students = data.results.map((user, index) => ({
    id: user.email || index,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    imageUrl: user.picture.large,
  }));

  // Split into 3 groups
  const design = students.slice(0, 3);
  const digitalEngineering = students.slice(3, 6);
  const geodataScience = students.slice(6, 9);

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