import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const getCartCount = useStore(state => state.getCartCount);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'DIY Products', path: '/products' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'About', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Contact', path: '#' }
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 glass-panel border-b-0 border-border-color/50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold font-poppins text-primary-accent flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-accent to-orange-600 flex items-center justify-center text-primary-bg">
                <span className="text-lg font-black tracking-tighter">NR</span>
              </div>
              NeuroRob
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative group font-medium transition-colors duration-300 ${
                      isActive ? 'text-primary-accent' : 'text-primary-text hover:text-primary-accent'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-accent rounded-full"
                      />
                    )}
                    {!isActive && (
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-5">
              <button className="text-secondary-text hover:text-primary-accent transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-secondary-text hover:text-primary-accent transition-colors group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {getCartCount() > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary-accent text-primary-bg text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </button>
              
              <button className="text-secondary-text hover:text-primary-accent transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden text-secondary-text hover:text-primary-accent"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card-bg border-b border-border-color absolute top-[72px] left-0 w-full z-30 overflow-hidden"
          >
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-accent bg-secondary-bg/50 border-l-4 border-primary-accent'
                      : 'text-secondary-text hover:text-primary-text hover:bg-secondary-bg/30 border-l-4 border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;