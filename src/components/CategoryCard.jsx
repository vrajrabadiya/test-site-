import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-panel rounded-xl p-6 border border-border-color hover:border-primary-accent transition-all duration-300 group"
    >
      <div className="bg-secondary-bg/50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-accent transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.4)]">
        <Icon className="text-primary-accent group-hover:text-primary-bg w-7 h-7 transition-colors duration-300" />
      </div>
      <h3 className="font-bold text-xl mb-3 font-poppins">{title}</h3>
      <p className="text-secondary-text text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default CategoryCard;