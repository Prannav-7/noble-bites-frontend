import React from 'react';
import { ArrowLeft, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const CartPage = () => {
  // Mock cart items (using first 4 products)
  const cartItems = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-[#EBC7C7] rounded-3xl p-6 md:p-8 shadow-xl min-h-[80vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-brand-text/10 pb-4">
          <div className="flex items-center gap-4">
            <Link to="/menu" className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-brand-text" />
            </Link>
            <h1 className="font-heading text-3xl font-bold text-brand-text">My Carts</h1>
          </div>
          
          <div className="text-center hidden md:block">
             <h2 className="font-heading text-2xl font-bold text-brand-primary">Noble Bits</h2>
          </div>

          <button className="flex items-center gap-2 bg-brand-card text-white px-4 py-2 rounded-lg font-medium shadow-sm">
             <ShoppingCart size={18} /> Orders
          </button>
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-brand-card rounded-xl p-4 flex gap-4 shadow-lg text-white">
               {/* Image */}
               <div className="w-1/3 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 mb-2 bg-white">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-center leading-tight">{item.name}</h3>
                  <div className="flex mt-1 text-yellow-400 text-xs">★★★★★</div>
                  <button className="mt-2 text-xs bg-white text-brand-primary px-3 py-1 rounded-full flex items-center gap-1 hover:bg-gray-100">
                    <Trash2 size={10} /> Remove
                  </button>
               </div>

               {/* Details */}
               <div className="w-2/3 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                     <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">Details</span>
                  </div>
                  
                  <div className="space-y-1 text-xs md:text-sm opacity-90 mt-2">
                    <p className="font-semibold">Price: Rs.{item.price}</p>
                    <div className="flex items-center gap-2">
                       <span>Select Quantity:</span>
                       <div className="w-12 h-6 bg-white/20 rounded flex items-center justify-center">1</div>
                    </div>
                    <p>Free Delivery</p>
                    <p>No Return Policy</p>
                    <p>Cash On Delivery Available</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                     <button className="bg-white text-brand-primary font-bold py-1.5 px-6 rounded-full text-sm hover:bg-brand-secondary hover:text-white transition-colors">
                        Buy Now
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Footer/Pagination */}
        <div className="flex justify-center gap-4 mt-8 text-brand-text">
           <ArrowLeft className="cursor-pointer hover:text-brand-primary" />
           <ArrowRight className="cursor-pointer hover:text-brand-primary" />
        </div>

      </div>
    </div>
  );
};

export default CartPage;
