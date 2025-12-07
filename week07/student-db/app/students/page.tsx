import FilterBar from "../../components/FilterBar";
import StudentGrid from "../../components/StudentGrid";

type SearchParams = {
  gender?: string;
};

type ApiUser = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
};

export const dynamic = "force-dynamic"; // always fetch new data

export default async function StudentsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const gender = searchParams?.gender ?? "all";

  // Always fetch EXACTLY 9 people -> 3×3 grid
  let url = "https://randomuser.me/api/?results=9";

  if (gender !== "all") {
    url += `&gender=${gender}`;
  }

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
      <h1 className="page-title">Students</h1>
      <p className="page-subtitle">Browse through our best students.</p>

      <FilterBar />

      <StudentGrid students={students} />
    </section>
  );
}