
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: keyof typeof LucideIcons;
}

const FeatureCard = ({ title, description, iconName }: FeatureCardProps) => {
  const LucideIcon = LucideIcons[iconName];

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 flex flex-col transition-all duration-200 hover:shadow-md"
    >
      <div className="bg-neutral-100 w-12 h-12 flex items-center justify-center rounded-xl mb-4">
        <LucideIcon size={24} className="text-neutral-700" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm flex-grow">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
