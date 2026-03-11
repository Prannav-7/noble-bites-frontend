import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="inline-block">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Noble <span className="text-brand-gold">Bites</span>
            </h2>
          </Link>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Bringing you the finest traditional sweets and snacks, crafted with love and the purest ingredients since 2025.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-primary transition-all duration-300">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-primary transition-all duration-300">
              <Facebook size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-primary transition-all duration-300">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-xl font-bold mb-6 text-brand-gold">Quick Links</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
            <li><Link to="/menu" className="hover:text-brand-gold transition-colors">Our Menu</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            <li><Link to="/my-orders" className="hover:text-brand-gold transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="font-heading text-xl font-bold mb-6 text-brand-gold">Get in Touch</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-gold flex-shrink-0 mt-0.5" />
              <span>14, Gandhi Nagar, Ranipet District, TN 631102</span>
            </li>
            <li>
              <a href="tel:+917010984588" className="flex items-center gap-3 hover:text-brand-gold transition-colors">
                <Phone size={18} className="text-brand-gold flex-shrink-0" />
                <span>+91 70109 84588</span>
              </a>
            </li>
            <li>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ran17062005@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 hover:text-brand-gold transition-colors"
              >
                <Mail size={18} className="text-brand-gold flex-shrink-0" />
                <span>ran17062005@gmail.com</span>
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/917010984588?text=Hello%20Noble%20Bites!%20I'm%20interested%20in%20your%20products." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 hover:text-brand-gold transition-colors group"
              >
                <div className="bg-green-500/20 p-1.5 rounded-lg group-hover:bg-green-500/40 transition-colors">
                  <MessageCircle size={18} className="text-green-400" />
                </div>
                <span>WhatsApp Us</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-heading text-xl font-bold mb-6 text-brand-gold">Newsletter</h3>
          <p className="text-white/70 text-sm mb-4">Subscribe to get special offers and news.</p>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button className="absolute right-2 top-1.5 bg-brand-gold text-brand-primary p-1.5 rounded-lg hover:bg-white transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
        <p>&copy; {currentYear} Noble Bites. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-brand-gold">Privacy Policy</Link>
          <Link to="#" className="hover:text-brand-gold">Terms of Service</Link>
          <Link to="#" className="hover:text-brand-gold">Shipping Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
