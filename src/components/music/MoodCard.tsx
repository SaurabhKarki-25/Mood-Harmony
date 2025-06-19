
import { MoodType } from '../../types';
import { motion } from 'framer-motion';

interface MoodCardProps {
  mood: MoodType;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const MoodCard = ({ mood, isActive, onClick, index }: MoodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button
        onClick={onClick}
        className={`relative w-full overflow-hidden rounded-xl transition-all duration-300 ${
          isActive ? 'ring-2 ring-primary-500 scale-[1.03]' : 'hover:scale-[1.02]'
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={mood.imageUrl} 
            alt={mood.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-surface-950 to-transparent ${
            isActive ? 'opacity-60' : 'opacity-80'
          }`}></div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <h3 className={`font-display text-xl font-bold mb-1 ${
              isActive ? 'text-primary-300' : 'text-white'
            }`}>
              {mood.name}
            </h3>
            <p className="text-surface-300 text-sm">
              {mood.description}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default MoodCard;