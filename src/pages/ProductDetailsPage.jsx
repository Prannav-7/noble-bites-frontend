import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Star, Heart, ShoppingBag, ShoppingCart,
  Truck, ShieldCheck, Clock, MessageCircle, CheckCircle,
  Minus, Plus, Package, Zap
} from 'lucide-react';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_ENDPOINTS, getImageUrl } from '../config/api';
import { parseWeight, calculateCustomPrice, isCustomizableWeight } from '../utils/weightUtils';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [hasOrdered, setHasOrdered] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [customWeightValue, setCustomWeightValue] = useState('');
  const [customWeightUnit, setCustomWeightUnit] = useState('g');
  const [displayPrice, setDisplayPrice] = useState(0);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const localProduct = products.find(p => p.id === id || p.id === parseInt(id));
      try {
        const response = await axios.get(API_ENDPOINTS.PRODUCTS);
        const backendProducts = response.data || [];
        const liveProduct = backendProducts.find(p => p._id === id || p._id?.toString() === id);
        if (localProduct && liveProduct) {
          setProduct({
            ...localProduct,
            _id: liveProduct._id,
            price: liveProduct.price ?? localProduct.price,
            inStock: liveProduct.inStock ?? localProduct.inStock,
            stockQuantity: liveProduct.stockQuantity ?? localProduct.stockQuantity,
            rating: liveProduct.rating ?? localProduct.rating,
          });
        } else if (localProduct) {
          setProduct(localProduct);
        } else if (liveProduct) {
          setProduct(liveProduct);
        } else {
          setProduct(null);
        }
      } catch {
        setProduct(localProduct || null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      const isCustomVal = isCustomizableWeight(product.weight);
      setIsCustomizable(isCustomVal);
      if (isCustomVal) {
        const parsed = parseWeight(product.weight);
        setCustomWeightValue(parsed.value);
        setCustomWeightUnit(parsed.unit);
      }
      setDisplayPrice(product.price);
    }
  }, [product]);

  useEffect(() => {
    if (product && isCustomizable && customWeightValue > 0) {
      const newPrice = calculateCustomPrice(product.price, product.weight, customWeightValue, customWeightUnit);
      setDisplayPrice(newPrice);
    }
  }, [customWeightValue, customWeightUnit, product, isCustomizable]);

  useEffect(() => {
    if (product && isAuthenticated()) {
      fetchReviews(); checkReviewEligibility(); fetchRelatedProducts();
    } else if (product) {
      fetchReviews(); fetchRelatedProducts();
    }
    if (searchParams.get('review') === 'true' && isAuthenticated()) {
      setTimeout(() => {
        setShowReviewForm(true);
        document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [product, isAuthenticated]);

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const response = await axios.get(API_ENDPOINTS.PRODUCT_REVIEWS(id));
      if (response.data.success) setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const checkReviewEligibility = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.CAN_REVIEW(id), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        setCanReview(response.data.canReview);
        setHasPurchased(response.data.hasPurchased);
        setHasOrdered(response.data.hasOrdered || false);
        setHasReviewed(response.data.hasReviewed);
      }
    } catch (error) {
      console.error('Error checking review eligibility:', error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PRODUCTS);
      const backendProducts = response.data || [];
      const backendMap = {};
      backendProducts.forEach(p => { backendMap[p._id] = p; });
      const localWithImages = products.map(local => {
        const live = backendMap[local.id];
        if (live) return { ...local, _id: live._id, price: live.price ?? local.price, rating: live.rating ?? local.rating };
        return local;
      });
      const currentProductId = product._id || product.id;
      setRelatedProducts(localWithImages.filter(p => (p._id || p.id) !== currentProductId && p.category === product.category).slice(0, 4));
    } catch {
      const currentProductId = product._id || product.id;
      setRelatedProducts(products.filter(p => (p._id || p.id) !== currentProductId && p.category === product.category).slice(0, 4));
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) { toast.error('Please login to submit a review'); setShowAuthModal(true); return; }
    if (!canReview) {
      toast.error(!hasPurchased ? 'You can only review products you have purchased and received' : 'You have already reviewed this product');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_ENDPOINTS.REVIEWS,
        { product: id, rating: reviewForm.rating, comment: reviewForm.comment },
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        toast.success('Review submitted successfully!');
        setReviewForm({ rating: 5, comment: '' });
        setShowReviewForm(false);
        fetchReviews(); checkReviewEligibility();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-brand-primary/10" />
          <div className="absolute inset-0 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-brand-text/50 text-sm">Loading product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-brand-text">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/menu" className="text-brand-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Menu
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product._id || product.id);
  const isOutOfStock = !product.inStock || product.stockQuantity === 0;

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      toast.error('Please login to continue');
      setPendingAction(() => handleAddToCart);
      setShowAuthModal(true);
      return;
    }
    const weightInfo = isCustomizable ? { value: parseFloat(customWeightValue), unit: customWeightUnit } : null;
    addToCart(product, quantity, weightInfo);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated()) {
      toast.error('Please login to continue');
      setPendingAction(() => handleBuyNow);
      setShowAuthModal(true);
      return;
    }
    const weightInfo = isCustomizable ? { value: parseFloat(customWeightValue), unit: customWeightUnit } : null;
    addToCart(product, quantity, weightInfo);
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated()) {
      toast.error('Please login to continue');
      setPendingAction(() => handleWishlistToggle);
      setShowAuthModal(true);
      return;
    }
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingAction) { pendingAction(); setPendingAction(null); }
  };

  const totalPrice = Math.round(displayPrice * quantity * 100) / 100;

  return (
    <>
      <div className="min-h-screen bg-brand-bg">

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <Link to="/menu" className="inline-flex items-center gap-2 text-brand-text/50 hover:text-brand-primary text-sm font-medium transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Menu
          </Link>
        </div>

        {/* ── Main Product Section ── */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* ── Left: Image ── */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-light to-white aspect-square">
                <img
                  src={product.image ? getImageUrl(product.image) : 'https://placehold.co/600x600'}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {product.category}
                  </span>
                  {isOutOfStock ? (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Out of Stock</span>
                  ) : product.stockQuantity < 10 ? (
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Low Stock</span>
                  ) : (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">In Stock</span>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={handleWishlistToggle}
                  className={`absolute top-4 right-4 p-3 rounded-2xl shadow-xl transition-all duration-300 ${
                    isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: Truck, label: 'Fast Delivery' },
                  { icon: ShieldCheck, label: 'Quality Assured' },
                  { icon: Package, label: 'Authentic Taste' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-sm border border-gray-100">
                    <Icon size={18} className="text-brand-primary" />
                    <span className="text-[10px] font-semibold text-brand-text/60 text-center">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Details ── */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-start space-y-6 pt-2">

              {/* Title + rating */}
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-primary leading-tight mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={17} fill={i < product.rating ? 'currentColor' : 'none'}
                        className={i < product.rating ? 'text-yellow-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-sm text-brand-text/50">({reviews.length} reviews)</span>
                  <span className="text-xs bg-brand-light text-brand-primary px-2 py-0.5 rounded-full font-semibold">{product.rating}/5</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-brand-primary">Rs. {displayPrice}</span>
                  <span className="text-brand-text/50 text-sm">
                    / {isCustomizable ? `${customWeightValue}${customWeightUnit}` : product.weight}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-brand-text/70 leading-relaxed text-base">{product.description}</p>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">Ingredients</span>
                  <p className="text-sm text-brand-text/70 line-clamp-3">{product.ingredients}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">Shelf Life</span>
                  <p className="text-sm text-brand-text/70 flex items-center gap-1.5">
                    <Clock size={13} className="text-brand-primary" /> {product.shelfLife}
                  </p>
                </div>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-brand-text/70">Availability:</span>
                {!isOutOfStock ? (
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      product.stockQuantity < 10 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${product.stockQuantity < 10 ? 'bg-amber-500' : 'bg-green-500'}`} />
                      {product.stockQuantity < 10 ? `Only ${product.stockQuantity} left` : 'In Stock'}
                    </span>
                  </div>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-red-500" /> Out of Stock
                  </span>
                )}
              </div>

              {/* Custom weight */}
              {isCustomizable && (
                <div className="bg-brand-light/40 border border-brand-secondary/20 rounded-2xl p-4">
                  <label className="text-xs font-bold text-brand-primary uppercase tracking-widest block mb-2">
                    Custom Weight ({customWeightUnit})
                  </label>
                  <input
                    type="number"
                    value={customWeightValue}
                    onChange={e => setCustomWeightValue(e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-brand-secondary/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-white font-bold text-brand-text"
                    placeholder={`Enter ${customWeightUnit}`}
                  />
                </div>
              )}

              {/* Quantity + total */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-brand-text/70 uppercase tracking-wider">Quantity</span>
                  <span className="text-sm text-brand-text/50">
                    Total: <span className="text-brand-primary font-extrabold text-xl ml-1">Rs. {totalPrice}</span>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-brand-bg rounded-xl overflow-hidden border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-brand-primary hover:bg-brand-light transition-colors font-bold"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-6 font-extrabold text-brand-text text-lg min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-brand-primary hover:bg-brand-light transition-colors font-bold"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl transition-all duration-200 text-sm shadow-lg ${
                    isOutOfStock
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-brand-primary text-white hover:bg-brand-text hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] shadow-brand-primary/20'
                  }`}
                >
                  <Zap size={18} /> Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl border-2 transition-all duration-200 text-sm ${
                    isOutOfStock
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                      : cartAdded
                      ? 'border-green-400 bg-green-50 text-green-600'
                      : 'border-brand-primary text-brand-primary bg-white hover:bg-brand-light hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {cartAdded ? (
                      <motion.span key="added" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <CheckCircle size={18} /> Added!
                      </motion.span>
                    ) : (
                      <motion.span key="cart" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                        <ShoppingCart size={18} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

            </motion.div>
          </div>
        </section>

        {/* ── Reviews Section ── */}
        <section id="reviews-section" className="max-w-7xl mx-auto px-4 pb-12 mt-4">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-primary flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center">
                  <MessageCircle size={20} className="text-brand-primary" />
                </div>
                Customer Reviews
              </h2>
              {isAuthenticated() && canReview && !showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-brand-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-text transition-colors text-sm flex items-center gap-2"
                >
                  <Star size={16} /> Write a Review
                </button>
              )}
            </div>

            {/* Notices */}
            {isAuthenticated() && !hasOrdered && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                <MessageCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 text-sm font-semibold">Purchase required to review</p>
                  <p className="text-amber-600 text-xs mt-0.5">Order and receive this product to share your experience.</p>
                </div>
              </div>
            )}
            {isAuthenticated() && hasOrdered && !hasPurchased && !hasReviewed && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                <Clock size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 text-sm font-semibold">Order in progress!</p>
                  <p className="text-blue-600 text-xs mt-0.5">You can review once your order is delivered. <Link to="/my-orders" className="underline font-semibold">Track order →</Link></p>
                </div>
              </div>
            )}
            {isAuthenticated() && hasReviewed && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3">
                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                <p className="text-green-800 text-sm font-semibold">Thank you! You've already reviewed this product.</p>
              </div>
            )}

            {/* Review Form */}
            {showReviewForm && isAuthenticated() && canReview && (
              <motion.form
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmitReview}
                className="mb-8 p-6 bg-brand-bg rounded-2xl border border-brand-secondary/20"
              >
                <h3 className="font-bold text-lg text-brand-text mb-5">Write Your Review</h3>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-brand-text/70 mb-2">Your Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })} className="focus:outline-none hover:scale-110 transition-transform">
                        <Star size={30} className={star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-200'} fill={star <= reviewForm.rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-brand-text/70 mb-2">Your Review</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full px-4 py-3 border border-brand-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-white resize-none text-sm"
                    rows="4"
                    placeholder="Share your experience with this product..."
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-brand-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-text transition-colors text-sm">
                    Submit Review
                  </button>
                  <button type="button" onClick={() => setShowReviewForm(false)} className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm">
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {loadingReviews ? (
                <p className="text-center text-brand-text/50 py-8 text-sm">Loading reviews…</p>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageCircle size={24} className="text-brand-primary/40" />
                  </div>
                  <p className="text-brand-text/50 text-sm">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                reviews.map(review => (
                  <div key={review._id} className="p-5 bg-brand-bg rounded-2xl border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center font-bold text-sm">
                          {review.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-text text-sm">{review.userName}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className={i < review.rating ? 'text-yellow-400' : 'text-gray-200'} fill={i < review.rating ? 'currentColor' : 'none'} />
                              ))}
                            </div>
                            {review.isVerifiedPurchase && (
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle size={10} /> Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] text-brand-text/40">
                        {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-brand-text/70 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-primary mb-6">
              {isAuthenticated() ? 'You May Also Like' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(relatedProduct => {
                const pId = relatedProduct._id || relatedProduct.id;
                return (
                  <Link
                    key={pId}
                    to={`/product/${pId}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="aspect-square overflow-hidden bg-brand-light">
                      <img
                        src={relatedProduct.image ? getImageUrl(relatedProduct.image) : 'https://placehold.co/200x200'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-brand-text mb-1 group-hover:text-brand-primary transition-colors text-sm line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-primary font-extrabold">Rs. {relatedProduct.price}</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={13} fill="currentColor" />
                          <span className="text-xs text-brand-text/50">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => { setShowAuthModal(false); setPendingAction(null); }}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default ProductDetailsPage;
