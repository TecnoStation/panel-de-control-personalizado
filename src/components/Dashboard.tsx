import { ChevronRight } from "lucide-react";
import { LearningCard } from "./LearningCard";

const learningItems = [
  {
    number: 1,
    title: "Make terminology",
    description: "Get familiar with basic terms",
  },
  {
    number: 2,
    title: "Understanding operations",
    description: "Learn how to count operations",
  },
  {
    number: 3,
    title: "Scheduling",
    description: "How to schedule your scenarios",
  },
  {
    number: 4,
    title: "Filtering data",
    description: "Filter data in your workflows",
  },
  {
    number: 5,
    title: "Routers",
    description: "How to build multiple branches",
  },
  {
    number: 6,
    title: "Iterator & Aggregator",
    description: "Combine and separate bundles",
  },
];

export const Dashboard = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
        </div>
        <h2 className="text-xl font-semibold dark:text-white">Active scenarios</h2>
        <h2 className="text-xl font-semibold dark:text-white">Explore</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {learningItems.map((item) => (
          <LearningCard key={item.number} {...item} />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 md:mb-6 dark:text-white">Recommended Templates</h2>
      </div>
    </div>
  );
};
