import Link from "next/link";
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
  const gender = searchParams?.gender ?? "female";

  const url = `https://randomuser.me/api/?results=9&gender=${gender}`;

  const res = await fetch(url);
  const data = await res.json();

  const users: ApiUser[] = data.results;

  const students = users.map((user, index) => ({
    id: user.email || String(index),
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    imageUrl: user.picture.large,
  }));

  return (
    <section>
      <h1 className="page-title">Filtered Students</h1>
      <p className="page-subtitle">
        Showing {gender === "male" ? "male" : "female"} students only.
      </p>

      <div className="filter-buttons">
        <Link
          href="/filter?gender=female"
          className={gender === "female" ? "filter-btn active" : "filter-btn"}
        >
          Female
        </Link>
        <Link
          href="/filter?gender=male"
          className={gender === "male" ? "filter-btn active" : "filter-btn"}
        >
          Male
        </Link>
      </div>

      <StudentGrid students={students} />
    </section>
  );
}
