import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BarChart } from 'lucide-react';

const WorkshopCard = ({ workshop }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass-panel rounded-xl overflow-hidden min-w-[300px] md:min-w-[350px] group transition-all duration-300 hover:border-primary-accent"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={workshop.image} 
          alt={workshop.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-block bg-primary-accent text-primary-bg text-xs font-bold py-1 px-3 rounded-full mb-2 uppercase tracking-wide glow-orange">
            ${workshop.price}
          </div>
          <h3 className="font-bold text-xl text-primary-text leading-tight">{workshop.title}</h3>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center justify-center bg-secondary-bg/50 rounded p-2 text-center">
            <Calendar className="w-4 h-4 text-primary-accent mb-1" />
            <span className="text-[10px] text-secondary-text uppercase tracking-wider">{workshop.date}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-secondary-bg/50 rounded p-2 text-center">
            <Clock className="w-4 h-4 text-primary-accent mb-1" />
            <span className="text-[10px] text-secondary-text uppercase tracking-wider">{workshop.duration}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-secondary-bg/50 rounded p-2 text-center">
            <BarChart className="w-4 h-4 text-primary-accent mb-1" />
            <span className="text-[10px] text-secondary-text uppercase tracking-wider">{workshop.level}</span>
          </div>
        </div>
        <p className="text-secondary-text text-sm mb-5 line-clamp-2">{workshop.description}</p>
        <button className="w-full bg-card-bg border border-primary-accent hover:bg-primary-accent hover:text-primary-bg text-primary-accent font-bold py-3 px-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 group-hover:glow-orange">
          Enroll Now
        </button>
      </div>
    </motion.div>
  );
};

export default WorkshopCard;