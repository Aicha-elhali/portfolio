export default function ImprintPage() {
  return (
    <section>
      <h1 className="page-title">Imprint</h1>

      <p className="page-subtitle">
        Information about the creator of this student database.
      </p>

      <div className="imprint-content">
        <p><strong>Name:</strong> Your Name</p>
        <p><strong>Course:</strong> Web Technologies</p>
        <p><strong>Email:</strong> you@example.com</p>

        <p>
          This website is a student project for learning modern web development
          with Next.js. All data on the Students page is randomly generated
          using the Random User API and does not represent real students of the
          university.
        </p>
      </div>
    </section>
  );
}