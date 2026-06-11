import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';
import useStore from '../store/useStore';
import AuthModal from './AuthModal';
import { mergeGuestCartWithUserCart } from '../utils/cartMerge';

export default function CheckoutButton({ onCheckoutProceed }) {
  const [session, setSession] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const initializeCart = useStore((state) => state.initializeCart);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen to auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;

    if (session) {
      // User is authenticated, proceed directly
      onCheckoutProceed(session);
    } else {
      // Intercept and open Auth Modal
      setAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = async (activeSession) => {
    setAuthModalOpen(false);
    setSession(activeSession);

    // Run the merge logic
    const localCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
    await mergeGuestCartWithUserCart(supabase, activeSession.user.id, localCart);

    // Reinitialize the cart state with the database items
    await initializeCart(activeSession);

    // Proceed with checkout
    onCheckoutProceed(activeSession);
  };

  return (
    <>
      <button
        onClick={handleCheckoutClick}
        disabled={cart.length === 0}
        className="w-full bg-primary-accent hover:bg-hover-accent text-primary-bg font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 glow-orange-hover disabled:opacity-50"
      >
        Proceed to Checkout <ArrowRight className="w-5 h-5" />
      </button>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
