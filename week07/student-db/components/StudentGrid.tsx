import StudentCard from "./StudentCard";

export type Student = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

type StudentGridProps = {
  students: Student[];
};

export default function StudentGrid({ students }: StudentGridProps) {
  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          email={student.email}
          imageUrl={student.imageUrl}
        />
      ))}
    </div>
  );
}