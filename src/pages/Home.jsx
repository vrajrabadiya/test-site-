import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Bot,
  Zap,
  Users,
  Award,
  TrendingUp,
  Wrench,
  Cpu as Brain,
  Lightbulb,
  Users as CommunityIcon
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import WorkshopCard from '../components/WorkshopCard';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import products from '../data/products';
import workshops from '../data/workshops';

// Custom Animated Counter Component
const AnimatedCounter = ({ value, label, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''));
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center p-6 glass-panel rounded-2xl border border-border-color/50 relative overflow-hidden group hover:border-primary-accent transition-colors"
    >
      <div className="absolute inset-0 bg-primary-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="text-5xl font-black font-poppins text-primary-text mb-2 text-glow group-hover:text-primary-accent transition-colors duration-300">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-secondary-text font-medium uppercase tracking-widest text-sm">{label}</div>
    </motion.div>
  );
};

const Home = () => {
  const featuredProducts = products.slice(0, 8);
  const upcomingWorkshops = workshops.slice(0, 4);

  const categories = [
    { icon: Bot, title: "Robotics Kits", description: "Complete kits for building your own robots from scratch" },
    { icon: Brain, title: "AI & IoT", description: "Intelligent systems and Internet of Things solutions" },
    { icon: Wrench, title: "DIY Electronics", description: "Components and tools for electronic projects" },
    { icon: Lightbulb, title: "Student Innovation", description: "Resources designed specifically for student projects" }
  ];

  const stats = [
    { value: "1000", suffix: "+", label: "Students Trained" },
    { value: "50", suffix: "+", label: "Workshops Conducted" },
    { value: "200", suffix: "+", label: "DIY Products" },
    { value: "95", suffix: "%", label: "Positive Feedback" }
  ];

  const benefits = [
    { icon: Wrench, title: "Hands-On Learning", description: "Practical knowledge through real projects and experiments" },
    { icon: Users, title: "Expert Mentors", description: "Learn directly from industry professionals and educators" },
    { icon: Award, title: "Certification", description: "Get certified and boost your career opportunities" },
    { icon: CommunityIcon, title: "Community Support", description: "Join a passionate robotics and makers community" },
    { icon: TrendingUp, title: "Affordable Kits", description: "High-quality kits at reasonable prices for all students" },
    { icon: Zap, title: "Innovative Projects", description: "Work on real-world innovative ideas and solutions" }
  ];

  const testimonials = [
    { name: "Alex Johnson", role: "Engineering Student", quote: "The robotics kit I bought helped me win first place at the university tech competition. The documentation and support were exceptional!" },
    { name: "Sarah Williams", role: "High School Teacher", quote: "Our school adopted NeuroRob workshops and saw a 40% increase in student engagement in STEM subjects. Highly recommended!" },
    { name: "Michael Chen", role: "Maker Enthusiast", quote: "The ESP32 AI kit opened up so many possibilities for my home automation projects. The learning curve was perfect for my skill level." }
  ];

  return (
    <div className="relative">
      <Navbar />
      <Hero />

      {/* Categories Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-poppins mb-4 uppercase tracking-wide">Explore Categories</h2>
            <div className="w-24 h-1 bg-primary-accent mx-auto rounded-full glow-orange"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard icon={category.icon} title={category.title} description={category.description} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-secondary-bg/30 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSIvPjwvc3ZnPg==')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-4xl font-bold font-poppins mb-4 uppercase tracking-wide">Featured DIY Products</h2>
              <div className="w-24 h-1 bg-primary-accent rounded-full glow-orange"></div>
            </div>
            <button className="mt-6 md:mt-0 text-primary-accent hover:text-hover-accent font-bold uppercase tracking-wider flex items-center gap-2 group">
              View All <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-4xl font-bold font-poppins mb-4 uppercase tracking-wide">Upcoming Workshops</h2>
              <div className="w-24 h-1 bg-primary-accent rounded-full glow-orange"></div>
            </div>
            <button className="mt-6 md:mt-0 text-primary-accent hover:text-hover-accent font-bold uppercase tracking-wider flex items-center gap-2 group">
              View All <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

          <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x">
            {upcomingWorkshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-start"
              >
                <WorkshopCard workshop={workshop} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary-bg/50 border-y border-border-color/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedCounter key={index} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose NeuroRob */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-poppins mb-4 uppercase tracking-wide">Why Choose NeuroRob?</h2>
            <div className="w-24 h-1 bg-primary-accent mx-auto rounded-full glow-orange"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel rounded-2xl p-8 hover:border-primary-accent transition-colors group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary-bg/80 flex items-center justify-center mb-6 group-hover:bg-primary-accent transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.4)]">
                  <benefit.icon className="w-8 h-8 text-primary-accent group-hover:text-primary-bg transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-xl mb-3 font-poppins">{benefit.title}</h3>
                <p className="text-secondary-text">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary-bg/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-poppins mb-4 uppercase tracking-wide">What Our Students Say</h2>
            <div className="w-24 h-1 bg-primary-accent mx-auto rounded-full glow-orange"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;