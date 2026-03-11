import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import MyOrdersPage from './pages/MyOrdersPage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Toaster position="top-center" />
          <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-secondary selection:text-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
