import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import useStore from '../store/useStore';
import CheckoutButton from './CheckoutButton';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, addToCart, getCartTotal, decreaseQuantity } = useStore();

  const handleDecrease = (item) => {
    decreaseQuantity(item.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] glass-panel bg-card-bg/95 z-50 flex flex-col border-l border-border-color shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-color">
              <div className="flex items-center gap-3 text-primary-accent">
                <ShoppingCart className="w-6 h-6" />
                <h2 className="text-xl font-bold text-primary-text font-poppins">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="text-secondary-text hover:text-primary-accent transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-secondary-text">
                  <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-primary-accent hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id}
                    className="flex gap-4 bg-secondary-bg/50 p-4 rounded-xl border border-border-color relative group"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-primary-accent font-bold mt-1">${item.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-card-bg rounded-lg p-1 border border-border-color">
                          <button 
                            onClick={() => handleDecrease(item)}
                            className="p-1 text-secondary-text hover:text-primary-text transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.qty}</span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="p-1 text-secondary-text hover:text-primary-text transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-secondary-text hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border-color bg-card-bg/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-secondary-text">Subtotal</span>
                  <span className="text-xl font-bold font-poppins">${getCartTotal().toFixed(2)}</span>
                </div>
                <CheckoutButton onCheckoutProceed={(session) => {
                  alert('Checkout proceeding! Order placed successfully.');
                  useStore.getState().clearCart();
                  onClose();
                }} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
