import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import products from '../data/products';
import useStore from '../store/useStore';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  
  const isWishlisted = product ? wishlist.some(item => item.id === product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link to="/products" className="text-primary-accent hover:underline">
              Return to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-grow py-24">
        <div className="container mx-auto px-4">
          <div className="bg-card-bg/50 backdrop-blur-md rounded-3xl border border-border-color overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Product Image */}
              <div className="lg:w-1/2 relative bg-secondary-bg/50 p-8 flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-accent/10 blur-[100px] rounded-full pointer-events-none"></div>
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={product.image} 
                  alt={product.name}
                  className="max-w-full max-h-full object-contain relative z-10 filter drop-shadow-2xl"
                />
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                  <span className="bg-primary-accent/20 text-primary-accent border border-primary-accent/50 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                    {product.category}
                  </span>
                  {product.rating >= 4.8 && (
                    <span className="bg-green-500/20 text-green-400 border border-green-500/50 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                      Top Rated
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">{product.name}</h1>
                  
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-color/50">
                    <div className="flex items-center bg-secondary-bg/50 px-3 py-1 rounded-lg">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-secondary-text ml-2 text-sm">(124 reviews)</span>
                    </div>
                    <span className="text-green-400 text-sm flex items-center gap-1 font-medium">
                      <Check className="w-4 h-4" /> In Stock
                    </span>
                  </div>

                  <p className="text-primary-accent font-bold text-4xl mb-6 font-poppins">${product.price}</p>
                  
                  <p className="text-secondary-text text-lg mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                    <div className="flex items-center bg-secondary-bg/50 rounded-xl border border-border-color p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-card-bg rounded-lg transition-colors text-xl font-medium"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-card-bg rounded-lg transition-colors text-xl font-medium"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => {
                        for(let i=0; i<quantity; i++) addToCart(product);
                      }}
                      className="flex-grow w-full sm:w-auto bg-primary-accent hover:bg-hover-accent text-primary-bg font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 glow-orange-hover uppercase tracking-wide"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => toggleWishlist(product)}
                        className={`p-4 rounded-xl border transition-all duration-300 flex-1 sm:flex-none flex justify-center ${isWishlisted ? 'border-primary-accent bg-primary-accent/10 text-primary-accent' : 'border-border-color hover:border-primary-accent hover:text-primary-accent bg-secondary-bg/30'}`}
                      >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-primary-accent' : ''}`} />
                      </button>
                      <button className="p-4 rounded-xl border border-border-color hover:border-primary-accent hover:text-primary-accent bg-secondary-bg/30 transition-all duration-300 flex-1 sm:flex-none flex justify-center">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border-color/50 pt-8 mt-auto">
                    <div className="flex items-center gap-3 text-secondary-text">
                      <Shield className="w-5 h-5 text-primary-accent" />
                      <span className="text-sm">1 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-3 text-secondary-text">
                      <Truck className="w-5 h-5 text-primary-accent" />
                      <span className="text-sm">Fast Shipping</span>
                    </div>
                    <div className="flex items-center gap-3 text-secondary-text">
                      <RotateCcw className="w-5 h-5 text-primary-accent" />
                      <span className="text-sm">30-Day Returns</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <div className="mt-16 bg-card-bg/50 backdrop-blur-md rounded-3xl border border-border-color overflow-hidden">
            <div className="flex border-b border-border-color overflow-x-auto scrollbar-hide">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-bold uppercase tracking-wider text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab 
                      ? 'text-primary-accent border-b-2 border-primary-accent bg-primary-accent/5' 
                      : 'text-secondary-text hover:text-primary-text hover:bg-secondary-bg/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8 lg:p-12 min-h-[300px]">
              {activeTab === 'description' && (
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-2xl font-poppins font-bold mb-4">Product Overview</h3>
                  <p className="text-secondary-text leading-relaxed text-lg mb-6">
                    {product.description} This kit includes everything you need to get started. Designed with both beginners and advanced users in mind, it provides a comprehensive learning experience while allowing for extensive customization.
                  </p>
                  <ul className="space-y-2 text-secondary-text list-disc pl-5">
                    <li>High-quality components verified for durability</li>
                    <li>Comprehensive step-by-step documentation</li>
                    <li>Compatible with Arduino and MicroPython</li>
                    <li>Access to our exclusive online community</li>
                  </ul>
                </div>
              )}
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-2xl font-poppins font-bold mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Microcontroller", value: "ESP32 Dual Core" },
                      { label: "Operating Voltage", value: "3.3V - 5V" },
                      { label: "Connectivity", value: "WiFi 802.11 b/g/n, Bluetooth v4.2" },
                      { label: "Dimensions", value: "120mm x 85mm x 45mm" },
                      { label: "Weight", value: "250g" },
                      { label: "Software Support", value: "C++, MicroPython, CircuitPython" },
                    ].map((spec, idx) => (
                      <div key={idx} className="flex border-b border-border-color/50 py-3">
                        <span className="w-1/3 text-secondary-text font-medium">{spec.label}</span>
                        <span className="w-2/3 text-primary-text">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-2xl font-poppins font-bold mb-6">Customer Reviews</h3>
                  <p className="text-secondary-text mb-8">No reviews yet. Be the first to review this product!</p>
                  <button className="bg-primary-accent/10 border border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-bg font-bold py-3 px-6 rounded-xl transition-all duration-300">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
