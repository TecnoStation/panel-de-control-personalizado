interface LearningCardProps {
  number: number;
  title: string;
  description: string;
}

export const LearningCard = ({ number, title, description }: LearningCardProps) => {
  return (
    <div className="p-6 border rounded-lg card-hover">
      <div className="flex items-start gap-4">
        <div className="text-4xl font-bold text-primary">{number}</div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};