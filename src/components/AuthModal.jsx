import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data?.session) {
          await onAuthSuccess(data.session);
        } else {
          setErrorMsg('Registration successful! Please check your email for a confirmation link.');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data?.session) {
          await onAuthSuccess(data.session);
        }
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="w-full max-w-md bg-zinc-950 border border-zinc-850 rounded-2xl p-8 text-white shadow-2xl relative z-10 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-600/10 blur-[80px] rounded-full pointer-events-none"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-extrabold mb-2 font-poppins bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent uppercase tracking-tight">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-zinc-400 text-sm mb-6 font-light">
            {isSignUp
              ? 'Join NeuroRob to sync your cart and place orders.'
              : 'Log in to your account to complete your checkout.'}
          </p>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-xl p-4 mb-6"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </motion.div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 pl-11 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="w-5 h-5 absolute left-4 top-3.5 text-zinc-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 pl-11 pr-11 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="w-5 h-5 absolute left-4 top-3.5 text-zinc-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-zinc-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition duration-300 shadow-lg glow-orange disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-sm text-zinc-400">
            <span>{isSignUp ? 'Already have an account? ' : "Don't have an account? "}</span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
              }}
              className="text-orange-500 hover:underline font-bold transition-all"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
