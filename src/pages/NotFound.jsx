import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow flex items-center justify-center py-32 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary-accent/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-[12rem] md:text-[16rem] font-black font-poppins leading-none mb-0 text-transparent bg-clip-text bg-gradient-to-b from-primary-accent to-primary-accent/20"
          >
            404
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold font-poppins mb-4 -mt-8"
          >
            Lost in the Circuit
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-secondary-text text-lg mb-10 max-w-md mx-auto"
          >
            The page you're looking for has been disconnected or doesn't exist in our system.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="bg-primary-accent hover:bg-hover-accent text-primary-bg font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 glow-orange-hover uppercase tracking-wide"
            >
              <Home className="w-5 h-5" /> Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="glass-panel text-primary-text hover:text-primary-accent font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 border border-border-color hover:border-primary-accent uppercase tracking-wide"
            >
              <ArrowLeft className="w-5 h-5" /> Go Back
            </button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotFound;
