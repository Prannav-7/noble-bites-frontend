import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Sparkles, ChefHat, Flame, Candy, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { products as fallbackProducts } from '../data/products';
import { API_ENDPOINTS } from '../config/api';
import { useCart } from '../contexts/CartContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
  }),
};

const categories = [
  { name: 'All',    icon: Sparkles, gradient: 'from-[#8B2E2E] to-[#D97777]' },
  { name: 'Sweet',  icon: Candy,    gradient: 'from-pink-500 to-rose-400'    },
  { name: 'Savory', icon: Flame,    gradient: 'from-amber-500 to-orange-400' },
];

const SORT_OPTIONS = [
  { label: 'Default',      value: 'default' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Top Rated',    value: 'rating'  },
];

const MenuPage = () => {
  const [searchTerm, setSearchTerm]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy]                   = useState('default');
  const [products, setProducts]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const { getCartCount }                      = useCart();
  const searchRef                             = useRef(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.PRODUCTS);
      const backendProducts = response.data || [];

      if (backendProducts.length > 0) {
        const backendMap = {};
        backendProducts.forEach(p => { backendMap[p._id] = p; });
        const merged = fallbackProducts.map(local => {
          const live = backendMap[local.id];
          if (live) {
            return {
              ...local,
              price: live.price ?? local.price,
              inStock: live.inStock ?? local.inStock,
              stockQuantity: live.stockQuantity ?? local.stockQuantity,
              rating: live.rating ?? local.rating,
            };
          }
          return local;
        });
        setProducts(merged);
      } else {
        setProducts(fallbackProducts);
      }
    } catch {
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat    = selectedCategory === 'All' || p.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating')     return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const handleReset = () => { setSearchTerm(''); setSelectedCategory('All'); setSortBy('default'); };

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Cinematic Hero ── */}
      <section className="relative overflow-hidden bg-[#1a0a0a] py-24 px-4">
        {/* animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] bg-[#8B2E2E]/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] bg-[#D97777]/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
              🍬 Handcrafted Daily · Tamil Nadu Originals
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight text-white mb-4">
              Our Full <span className="bg-gradient-to-r from-[#D97777] to-[#FFD6A5] bg-clip-text text-transparent">Menu</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
              From crispy murukkus to silky halwas — explore Tamil Nadu's finest traditional snacks & sweets, prepared fresh every day.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-white text-brand-primary font-bold px-6 py-3 rounded-full hover:bg-[#FFD6A5] transition-all shadow-xl shadow-black/30 hover:scale-105"
              >
                <ShoppingCart size={18} />
                View Cart
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
              <div className="text-white/40 text-sm">{products.length} items available</div>
            </div>
          </motion.div>

          {/* floating food images strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden md:flex justify-center gap-4 mt-12"
          >
            {[
              'https://images.unsplash.com/photo-1598511726623-d2e9996e4baa?q=80&w=200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1605197584547-c93aa1cd3d52?q=80&w=200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=200&auto=format&fit=crop',
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="food"
                style={{ transform: `rotate(${i % 2 === 0 ? '-3deg' : '3deg'}) translateY(${i % 3 === 0 ? '-8px' : '4px'})` }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-2xl border-2 border-white/10 hover:scale-110 transition-transform duration-300"
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filter / Search Bar ── */}
      <section className="sticky top-[4.5rem] z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">

          {/* Search */}
          <div className="relative w-full sm:w-64 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" size={16} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search sweets & snacks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-brand-bg/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 text-sm transition-all"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {categories.map(({ name, icon: Icon, gradient }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  selectedCategory === name
                    ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                    : 'bg-gray-100 text-brand-text/70 hover:bg-gray-200'
                }`}
              >
                <Icon size={13} />{name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <SlidersHorizontal size={14} className="text-brand-text/40" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs text-brand-text/70 bg-gray-100 border-0 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 cursor-pointer"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-brand-text/40 hidden sm:block flex-shrink-0">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="py-12 px-4 bg-brand-bg min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-5">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-brand-primary/10" />
                <div className="absolute inset-0 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
              </div>
              <p className="text-brand-text/50 font-medium text-sm tracking-wide">Loading our menu…</p>
            </div>
          ) : filtered.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${sortBy}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product._id || product.id}
                    custom={i}
                    variants={fadeUp}
                    layout
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mb-5">
                <ChefHat size={36} className="text-brand-primary/40" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-text/30 mb-2">Nothing found</h3>
              <p className="text-brand-text/40 text-sm max-w-xs mb-6">
                No products match your search. Try a different keyword or category.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-semibold hover:bg-brand-text transition-colors shadow-md"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-[#1a0a0a] py-20 px-4 text-white text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8B2E2E]/20 rounded-full blur-[100px]" />
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-5 relative z-10"
        >
          <span className="text-4xl">🍮</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Can't decide? Try our bestsellers!</h2>
          <p className="text-white/60">Our most-loved picks, selected by thousands of happy customers.</p>
          <button
            onClick={handleReset}
            className="inline-block bg-gradient-to-r from-[#D97777] to-[#FFD6A5] text-[#4A1C1C] font-bold px-8 py-3 rounded-full hover:scale-105 transition-all shadow-xl shadow-black/30"
          >
            Show All Products
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default MenuPage;
