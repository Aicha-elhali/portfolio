type StudentCardProps = {
  name: string;
  email: string;
  imageUrl: string;
};

export default function StudentCard({ name, email, imageUrl }: StudentCardProps) {
  return (
    <article className="student-card">
      <img src={imageUrl} alt={name} />

      <div className="student-card-body">
        <h3 className="student-card-name">{name}</h3>
        <p className="student-card-email">{email}</p>
      </div>
    </article>
  );
}