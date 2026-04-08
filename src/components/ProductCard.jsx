import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../config/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const productId = product._id || product.id;
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const wishlisted = isInWishlist(productId);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated()) {
      toast.error('Please login to add to cart');
      return;
    }
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 700);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated()) {
      toast.error('Please login to wishlist');
      return;
    }
    if (wishlisted) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const isOutOfStock = !product.inStock || product.stockQuantity === 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100 hover:-translate-y-1">

      {/* Image Area */}
      <div className="relative overflow-hidden bg-brand-light aspect-[4/3]">
        <Link to={`/product/${productId}`}>
          <img
            src={product.image ? getImageUrl(product.image) : 'https://placehold.co/400x300'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
            {product.category}
          </span>
          {isOutOfStock && (
            <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
              Sold Out
            </span>
          )}
          {!isOutOfStock && product.stockQuantity < 10 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
            wishlisted
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick view button */}
        <Link
          to={`/product/${productId}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-brand-primary text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-brand-primary hover:text-white"
        >
          <Eye size={13} /> Quick View
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${productId}`} className="flex-1">
          <h3 className="font-heading text-brand-text text-base font-bold mb-0.5 line-clamp-1 group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
          {product.weight && (
            <p className="text-xs text-brand-text/50 mb-2">{product.weight}</p>
          )}
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              fill={i < product.rating ? 'currentColor' : 'none'}
              className={i < product.rating ? 'text-yellow-400' : 'text-gray-200'}
            />
          ))}
          <span className="text-[11px] text-brand-text/40 ml-1">({product.rating})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto gap-2">
          <div>
            <span className="text-brand-primary font-extrabold text-lg">Rs. {product.price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isAdding
                ? 'bg-green-500 text-white scale-95'
                : 'bg-brand-primary text-white hover:bg-brand-text hover:scale-105 active:scale-95 shadow-md hover:shadow-brand-primary/30'
            }`}
          >
            <ShoppingCart size={15} />
            {isAdding ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
