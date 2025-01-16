interface LearningCardProps {
  number: number;
  title: string;
  description: string;
}

export const LearningCard = ({ number, title, description }: LearningCardProps) => {
  return (
    <div className="p-4 md:p-6 border rounded-lg card-gradient transition-all duration-200 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="text-3xl md:text-4xl font-bold number-gradient">{number}</div>
        <div>
          <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2 dark:text-white">{title}</h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};