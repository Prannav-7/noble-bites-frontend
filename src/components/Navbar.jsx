import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-sm shadow-sm border-b border-brand-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white">
              <UtensilsCrossed size={20} />
            </div>
            <span className="font-heading text-2xl font-bold text-brand-primary">Noble Bits</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium text-lg transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-brand-primary font-bold'
                    : 'text-brand-text hover:text-brand-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/cart" className="p-2 rounded-full bg-brand-secondary/20 hover:bg-brand-secondary/40 text-brand-primary transition-colors">
              <ShoppingCart size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-primary hover:text-brand-text focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-brand-bg border-t border-brand-secondary/20"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-text hover:text-brand-primary hover:bg-brand-light"
              >
                {link.name}
              </Link>
            ))}
             <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-text hover:text-brand-primary hover:bg-brand-light"
              >
                My Cart
              </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
