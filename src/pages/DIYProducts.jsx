import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import products from '../data/products';

const DIYProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.id - b.id;
  });

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-secondary-bg/50 py-32 overflow-hidden border-b border-border-color">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary-accent/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins uppercase tracking-tight">
              DIY <span className="text-primary-accent text-glow">Robotics</span> Products
            </h1>
            <p className="text-xl text-secondary-text max-w-2xl mx-auto font-light">
              Build your own ideas with our wide range of DIY robotics kits, electronics and components.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 lg:sticky lg:top-24 z-20">
              <div className="glass-panel rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6 border-b border-border-color/50 pb-4">
                  <h2 className="text-xl font-bold font-poppins uppercase tracking-wide">Filters</h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden text-primary-accent"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>

                <AnimatePresence>
                  {(showFilters || window.innerWidth >= 1024) && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-8 overflow-hidden lg:overflow-visible"
                    >
                      {/* Search */}
                      <div>
                        <div className="relative">
                          <input 
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-secondary-bg/50 border border-border-color rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-accent transition-colors placeholder-secondary-text"
                          />
                          <Search className="w-4 h-4 absolute left-4 top-3.5 text-secondary-text" />
                        </div>
                      </div>

                      {/* Categories */}
                      <div>
                        <h3 className="font-bold mb-4 text-sm text-secondary-text uppercase tracking-widest">Categories</h3>
                        <div className="space-y-1">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                selectedCategory === category
                                  ? 'bg-primary-accent text-primary-bg font-bold glow-orange'
                                  : 'hover:bg-secondary-bg text-secondary-text hover:text-primary-text'
                              }`}
                            >
                              <span>{category}</span>
                              <span className="text-xs opacity-60">
                                {category === 'All' ? products.length : products.filter(p => p.category === category).length}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div>
                        <h3 className="font-bold mb-4 text-sm text-secondary-text uppercase tracking-widest">Price Range</h3>
                        <div className="px-2">
                          <input
                            type="range"
                            min="0"
                            max="300"
                            step="10"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                            className="w-full h-1.5 bg-secondary-bg rounded-lg appearance-none cursor-pointer accent-primary-accent"
                          />
                          <div className="flex justify-between text-sm text-secondary-text mt-4 font-mono bg-secondary-bg/50 px-3 py-1.5 rounded-lg border border-border-color/50">
                            <span>$0</span>
                            <span className="text-primary-accent font-bold">${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Support */}
                      <div className="bg-gradient-to-br from-secondary-bg to-card-bg border border-primary-accent/20 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary-accent/10 blur-xl"></div>
                        <h3 className="font-bold mb-2 font-poppins">Need Help?</h3>
                        <p className="text-secondary-text text-xs mb-4 leading-relaxed">
                          Our engineering experts are here to help you choose the right components.
                        </p>
                        <button className="w-full bg-card-bg border border-primary-accent hover:bg-primary-accent hover:text-primary-bg text-primary-accent font-bold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                          Contact Us
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-card-bg/40 backdrop-blur-md border border-border-color p-4 rounded-2xl">
                <p className="text-secondary-text text-sm mb-4 sm:mb-0">
                  Showing <span className="font-bold text-primary-text">{sortedProducts.length}</span> results
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-secondary-bg/80 border border-border-color rounded-xl py-2 pl-4 pr-10 text-sm appearance-none cursor-pointer hover:border-primary-accent/50 transition-colors focus:outline-none"
                    >
                      <option value="featured">Default Sorting</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-primary-accent pointer-events-none" />
                  </div>
                </div>
              </div>

              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 glass-panel rounded-2xl">
                  <p className="text-xl text-secondary-text">No products found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setPriceRange([0, 300]);
                    }}
                    className="mt-6 text-primary-accent hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {sortedProducts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map(page => (
                      <button 
                        key={page}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${page === 1 ? 'bg-primary-accent text-primary-bg glow-orange' : 'bg-card-bg border border-border-color hover:bg-secondary-bg hover:text-primary-accent'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-card-bg border border-border-color hover:bg-secondary-bg hover:text-primary-accent transition-all">
                      →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DIYProducts;