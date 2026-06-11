import React from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const ProductCard = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass-panel rounded-xl overflow-hidden group hover:border-primary-accent transition-all duration-300 relative"
    >
      <div className="relative h-48 overflow-hidden bg-secondary-bg">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={() => addToCart(product)}
            className="bg-primary-accent hover:bg-hover-accent text-primary-bg p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg glow-orange"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button 
            className="bg-card-bg hover:text-primary-accent text-primary-text p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg border border-border-color"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${isWishlisted ? 'bg-primary-accent/20 text-primary-accent' : 'bg-black/20 text-white hover:bg-black/50'}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-primary-accent' : ''}`} />
        </button>
        
        <span className="absolute top-3 left-3 bg-secondary-bg/80 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-secondary-text uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-secondary-text text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="text-primary-text font-bold text-xl font-poppins">${product.price}</p>
          <div className="flex items-center bg-secondary-bg px-2 py-1 rounded">
            <span className="text-yellow-400 mr-1 text-sm">★</span>
            <span className="text-primary-text text-sm font-bold">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;