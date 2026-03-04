import React from 'react';
import { Category } from '../types';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelect,
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-300 ${
            activeCategory === category
              ? 'text-white'
              : 'text-gray-500'
          }`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-emerald-600 rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 text-sm font-semibold uppercase tracking-tight">
            {category}
          </span>
        </button>
      ))}
    </div>
  );
};