import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Filter, Sparkles, ChefHat, Flame, Candy } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { products as fallbackProducts } from '../data/products';
import { API_ENDPOINTS } from '../config/api';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const categories = [
  { name: 'All', icon: Sparkles, color: 'from-brand-primary to-[#D97777]' },
  { name: 'Sweet', icon: Candy, color: 'from-pink-500   to-rose-400' },
  { name: 'Savory', icon: Flame, color: 'from-amber-500  to-orange-400' },
];

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.PRODUCTS);
      setProducts(response.data?.length ? response.data : fallbackProducts);
    } catch {
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8B2E2E] to-[#D97777] py-20 px-4 text-white">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div className="space-y-5">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold tracking-widest uppercase">
                🍬 Handmade Daily
              </span>
              <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight">
                Our Full <span className="text-[#FFD6A5]">Menu</span>
              </h1>
              <p className="text-white/80 text-lg max-w-md">
                From crispy murukkus to silky halwas — explore Tamil Nadu's finest traditional snacks & sweets, prepared fresh every day.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link to="/cart" className="flex items-center gap-2 bg-white text-brand-primary font-bold px-6 py-3 rounded-full hover:bg-[#FFD6A5] transition-colors shadow-lg">
                  <ShoppingCart size={18} /> View Cart
                </Link>
                <span className="text-white/60 text-sm">{products.length} items available</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 hidden md:grid">
              {[
                'https://images.unsplash.com/photo-1598511726623-d2e9996e4baa?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1605197584547-c93aa1cd3d52?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="food"
                  className={`rounded-2xl object-cover h-32 w-full shadow-lg ${i % 2 === 0 ? 'translate-y-3' : '-translate-y-3'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter / Search Bar ── */}
      <section className="sticky top-[4.5rem] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-72 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search sweets & snacks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-primary/30 text-sm"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
            {categories.map(({ name, icon: Icon, color }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === name
                    ? `bg-gradient-to-r ${color} text-white shadow-md scale-105`
                    : 'bg-gray-100 text-brand-text hover:bg-gray-200'
                  }`}
              >
                <Icon size={15} />
                {name}
              </button>
            ))}
          </div>

          <div className="ml-auto text-sm text-brand-text/40 hidden sm:block">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
              <p className="text-brand-text/50 font-medium">Loading our menu…</p>
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product._id || product.id}
                  custom={i}
                  variants={fadeUp}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <ChefHat size={56} className="text-brand-primary/20 mb-4" />
              <h3 className="font-heading text-2xl font-bold text-brand-text/30 mb-2">Nothing found</h3>
              <p className="text-brand-text/40 text-sm max-w-xs">
                No products match your search. Try a different keyword or category.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="mt-6 px-6 py-2.5 bg-brand-primary text-white rounded-full text-sm font-semibold hover:bg-[#7a2626] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA Strip ── */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#8B2E2E] to-[#D97777] text-white text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Can't decide? Try our bestsellers!</h2>
          <p className="text-white/75">Our most-loved picks, selected by thousands of happy customers.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="inline-block bg-white text-brand-primary font-bold px-8 py-3 rounded-full hover:bg-[#FFD6A5] transition-colors shadow-lg"
          >
            Show All Products
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default MenuPage;
