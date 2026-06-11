import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';
import ChatWidget from './components/ChatWidget';
import { supabase } from './supabaseClient';
import useStore from './store/useStore';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const initializeCart = useStore((state) => state.initializeCart);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      initializeCart(session);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      initializeCart(session);
    });

    return () => subscription.unsubscribe();
  }, [initializeCart]);

  return (
    <Router>
      <ScrollToTop />
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary-accent to-orange-500 z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="min-h-screen bg-primary-bg text-primary-text">
        <AppRoutes />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;