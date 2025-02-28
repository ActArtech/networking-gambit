
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface ProfileCardProps {
  title: string;
  description: string;
  iconName: keyof typeof LucideIcons;
}

const ProfileCard = ({ title, description, iconName }: ProfileCardProps) => {
  const Icon = LucideIcons[iconName];

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 transition-all duration-200 hover:shadow-md h-full"
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-neutral-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
          <Icon size={32} className="text-neutral-700" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
