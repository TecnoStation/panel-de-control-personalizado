interface LearningCardProps {
  number: number;
  title: string;
  description: string;
}

export const LearningCard = ({ number, title, description }: LearningCardProps) => {
  return (
    <div className="p-4 md:p-6 border rounded-lg card-hover card-gradient card-gradient-hover">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="text-3xl md:text-4xl font-bold text-primary">{number}</div>
        <div>
          <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{title}</h3>
          <p className="text-sm md:text-base text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};