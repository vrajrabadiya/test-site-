import React from 'react';
import { motion } from 'framer-motion';
import { User, Star } from 'lucide-react';

const Testimonial = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-xl p-8 border border-border-color h-full flex flex-col hover:border-primary-accent/50 transition-colors"
    >
      <div className="flex text-primary-accent mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary-accent" />
        ))}
      </div>
      
      <p className="text-secondary-text italic mb-6 flex-grow leading-relaxed">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center mt-auto border-t border-border-color pt-4">
        <div className="bg-secondary-bg rounded-full w-12 h-12 flex items-center justify-center text-primary-accent mr-4">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold font-poppins">{testimonial.name}</h4>
          <p className="text-secondary-text text-xs uppercase tracking-wider">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonial;