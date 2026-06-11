import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WorkshopCard from '../components/WorkshopCard';
import Newsletter from '../components/Newsletter';
import workshops from '../data/workshops';

const TimelineItem = ({ workshop, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between w-full mb-16 relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Connector Line for Mobile (hidden on desktop) */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-accent/30 md:hidden z-0"></div>
      
      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-5/12 ml-16 md:ml-0 z-10"
      >
        <div className="glass-panel rounded-2xl p-6 hover:border-primary-accent transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-primary-accent/20 text-primary-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {workshop.level}
            </span>
            <span className="text-primary-accent font-bold font-poppins text-xl">${workshop.price}</span>
          </div>
          <h3 className="text-2xl font-bold font-poppins mb-2">{workshop.title}</h3>
          <p className="text-secondary-text mb-6 line-clamp-3 leading-relaxed">{workshop.description}</p>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-secondary-text mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-accent" /> {workshop.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-accent" /> {workshop.duration}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-accent" /> NeuroRob Center
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-accent" /> 20 Seats Max
            </div>
          </div>
          
          <button className="w-full bg-secondary-bg/50 border border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-bg font-bold py-3 px-4 rounded-xl transition-all duration-300 group-hover:glow-orange">
            Register Now
          </button>
        </div>
      </motion.div>

      {/* Center Timeline Node */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card-bg border-4 border-primary-accent flex items-center justify-center z-20 shadow-[0_0_15px_rgba(255,122,0,0.5)]">
        <div className="w-3 h-3 rounded-full bg-primary-accent animate-ping"></div>
      </div>

      {/* Date Display (Opposite side) */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`hidden md:block w-5/12 text-center ${isEven ? 'md:text-left pl-8' : 'md:text-right pr-8'}`}
      >
        <span className="text-4xl font-black font-poppins text-primary-bg" style={{ WebkitTextStroke: '1px #FF7A00' }}>
          {workshop.date.split(',')[0]}
        </span>
        <p className="text-primary-accent font-bold uppercase tracking-widest mt-1">{workshop.date.split(',')[1] || "2026"}</p>
      </motion.div>
    </div>
  );
};

const Workshops = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-secondary-bg/50 py-32 overflow-hidden border-b border-border-color">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-accent/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins uppercase tracking-tight">
              Innovation <span className="text-primary-accent text-glow">Workshops</span>
            </h1>
            <p className="text-xl text-secondary-text max-w-2xl mx-auto font-light">
              Master robotics, AI, and electronics through hands-on, expert-led training sessions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-border-color"
            >
              <div className="w-16 h-16 mx-auto bg-primary-accent/10 rounded-full flex items-center justify-center mb-6 text-primary-accent">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-poppins mb-3">Expert Mentorship</h3>
              <p className="text-secondary-text">Learn directly from industry professionals with years of hands-on experience.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-border-color"
            >
              <div className="w-16 h-16 mx-auto bg-primary-accent/10 rounded-full flex items-center justify-center mb-6 text-primary-accent">
                <ArrowRight className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-poppins mb-3">Project-Based</h3>
              <p className="text-secondary-text">Build real working prototypes during the workshop that you can take home.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-8 rounded-2xl border border-border-color"
            >
              <div className="w-16 h-16 mx-auto bg-primary-accent/10 rounded-full flex items-center justify-center mb-6 text-primary-accent">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-poppins mb-3">Certification</h3>
              <p className="text-secondary-text">Receive an industry-recognized certificate upon successful completion.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="py-24 bg-secondary-bg/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold font-poppins mb-4 uppercase tracking-wide">Upcoming Schedule</h2>
            <div className="w-24 h-1 bg-primary-accent mx-auto rounded-full glow-orange"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Main Vertical Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-accent/0 via-primary-accent/50 to-primary-accent/0 rounded-full"></div>
            
            {/* Timeline Items */}
            <div className="flex flex-col w-full">
              {workshops.map((workshop, index) => (
                <TimelineItem key={workshop.id} workshop={workshop} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Grid View fallback for smaller screens or alternative view */}
      <section className="py-24 hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <WorkshopCard workshop={workshop} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Workshops;
