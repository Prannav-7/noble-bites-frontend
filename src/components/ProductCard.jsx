import React from 'react';
import { Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-brand-card rounded-xl p-4 flex flex-col items-center text-center shadow-lg transform transition-transform hover:scale-105 duration-300 relative group overflow-hidden h-full">
      {/* Circle Image Container */}
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-3 shadow-md bg-white shrink-0">
        <img 
          src={product.image || "https://img-wrapper.vercel.app/image?url=https://placehold.co/200x200"} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="text-white font-heading text-xl font-bold mb-1 line-clamp-1">{product.name}</h3>
      <p className="text-white/90 text-sm mb-3">Rs.{product.price}</p>
      
      <div className="flex items-center justify-between w-full mt-auto px-2">
        <Link 
          to={`/product/${product.id}`}
          className="bg-brand-secondary hover:bg-white hover:text-brand-primary text-white text-xs font-bold py-1.5 px-4 rounded-full transition-colors shadow-sm flex items-center gap-1"
        >
          <Eye size={12} /> View Details
        </Link>
        <div className="flex items-center text-yellow-400">
           {[...Array(5)].map((_, i) => (
             <Star key={i} size={12} fill={i < product.rating ? "currentColor" : "none"} className={i < product.rating ? "text-yellow-400" : "text-white/30"} />
           ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
