export default function StudentGrid({ students }) {
  return (
    <div className="student-image-grid">
      {students.map((student) => (
        <div key={student.id} className="student-item">
          <img
            src={student.imageUrl}
            alt={student.name}
            className="student-image"
          />

          <p className="student-name">{student.name}</p>
          <p className="student-email">{student.email}</p>
        </div>
      ))}
    </div>
  );
}