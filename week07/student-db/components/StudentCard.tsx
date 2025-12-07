// Author: Aicha El Hali
// Course: Computer Science and Design (Web Technologie)
// Semester: 3rd Semester
// File: components/StudentCard.tsx
// Description: Renders a single student card with image, name and email.


type StudentCardProps = {
  name: string;
  email: string;
  imageUrl: string;
};

// Display one student entry with profile image and basic information
export default function StudentCard({ name, email, imageUrl }: StudentCardProps) {
  return (
    <article className="student-card">
        {/* Student profile image */}
      <img src={imageUrl} alt={name} />

        {/* Text section: name and email */}
      <div className="student-card-body">
        <h3 className="student-card-name">{name}</h3>
        <p className="student-card-email">{email}</p>
      </div>
    </article>
  );
}