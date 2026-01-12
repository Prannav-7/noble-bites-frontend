import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, ShieldCheck } from 'lucide-react';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 40;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend/Supabase
    alert("Order Placed Successfully!");
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg p-4">
        <h2 className="font-heading text-3xl text-brand-primary mb-4">Your cart is empty</h2>
        <Link to="/menu" className="bg-brand-secondary text-white px-6 py-2 rounded-full">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/menu" className="p-2 hover:bg-brand-secondary/10 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-brand-text" />
          </Link>
          <h1 className="font-heading text-3xl font-bold text-brand-primary">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-secondary/20">
              <h2 className="font-heading text-xl font-bold text-brand-text mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-brand-primary" /> Shipping Details
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-text">First Name</label>
                  <input 
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg/50 border border-brand-secondary/20 focus:ring-2 focus:ring-brand-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-text">Last Name</label>
                  <input 
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg/50 border border-brand-secondary/20 focus:ring-2 focus:ring-brand-primary outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-brand-text">Email Address</label>
                  <input 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg/50 border border-brand-secondary/20 focus:ring-2 focus:ring-brand-primary outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-brand-text">Street Address</label>
                  <input 
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg/50 border border-brand-secondary/20 focus:ring-2 focus:ring-brand-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-text">City</label>
                  <input 
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg/50 border border-brand-secondary/20 focus:ring-2 focus:ring-brand-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-text">ZIP Code</label>
                  <input 
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg/50 border border-brand-secondary/20 focus:ring-2 focus:ring-brand-primary outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-brand-text">Phone Number</label>
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg/50 border border-brand-secondary/20 focus:ring-2 focus:ring-brand-primary outline-none"
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-secondary/20">
              <h2 className="font-heading text-xl font-bold text-brand-text mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-brand-primary" /> Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-brand-primary/20 rounded-xl bg-brand-light/30 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="text-brand-primary focus:ring-brand-primary" />
                  <span className="font-medium text-brand-text">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer opacity-60">
                  <input type="radio" name="payment" disabled className="text-brand-primary" />
                  <span className="font-medium text-brand-text">Online Payment (Coming Soon)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-card text-white rounded-2xl p-6 shadow-xl sticky top-24">
              <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center bg-white/10 p-3 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-white" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-white/70">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-sm">Rs.{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/20 pt-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Subtotal</span>
                  <span>Rs.{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Shipping</span>
                  <span>Rs.{shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20">
                  <span>Total</span>
                  <span>Rs.{total}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                className="w-full bg-white text-brand-primary font-bold py-3 rounded-xl hover:bg-brand-secondary hover:text-white transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <ShieldCheck size={18} /> Place Order
              </button>
              
              <p className="text-xs text-center text-white/60 mt-4">
                By placing an order, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
