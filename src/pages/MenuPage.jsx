import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, ShoppingCart, ArrowLeft, ArrowRight, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { products as fallbackProducts } from '../data/products';

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Sweet', 'Savory'];

  // Fetch products from database
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');

      if (response.data && response.data.length > 0) {
        // Use database products
        setProducts(response.data);
      } else {
        // Fallback to static products if DB is empty
        setProducts(fallbackProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to static products on error
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Link to="/" className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 hover:bg-brand-secondary/20 rounded-full hidden lg:block">
              <ArrowLeft size={24} className="text-brand-text" />
            </Link>
            <input
              type="text"
              placeholder="Search sweets & snacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-brand-secondary/30 bg-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <div className="flex items-center gap-4">
            <h1 className="font-heading text-3xl font-bold text-brand-primary hidden md:block">Our Menu</h1>
          </div>

          <div className="flex gap-3">
            <Link to="/cart" className="flex items-center gap-2 bg-brand-secondary hover:bg-brand-primary text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
              <ShoppingCart size={18} /> Cart
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-brand-text border border-brand-secondary/20 hover:bg-brand-light'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-4 text-brand-text/60">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl text-brand-text/60 font-medium">No products found matching your criteria.</h3>
              </div>
            )}

            {/* Pagination Mock */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button className="p-2 rounded-full hover:bg-brand-secondary/20 text-brand-text disabled:opacity-50">
                <ArrowLeft size={24} />
              </button>
              <span className="font-medium text-brand-text">Page 1 of 1</span>
              <button className="p-2 rounded-full hover:bg-brand-secondary/20 text-brand-text disabled:opacity-50">
                <ArrowRight size={24} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
