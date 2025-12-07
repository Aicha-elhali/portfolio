// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// Semester: 3rd Semester
// File: components/StudentGrid.tsx
// Description: Renders a responsive grid of student cards (3×3 layout).


export default function StudentGrid({ students }) {
  // Render grid of student items
  return (
    <div className="student-image-grid">
      {/* Loop through all students and render each card */}
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