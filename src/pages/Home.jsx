import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, ShieldCheck, Recycle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products as fallbackProducts } from '../data/products';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.14, ease: 'easeOut' },
  }),
};

const testimonials = [
  { name: 'Priya Venkatesh', city: 'Chennai', stars: 5, text: 'The adhirasam from Noble Bites is exactly how my grandmother made it. Truly authentic and fresh!' },
  { name: 'Karthik Rajan', city: 'Bangalore', stars: 5, text: 'Ordered the murukku combo box for Diwali and the whole family loved it. Fast delivery too!' },
  { name: 'Anitha Selvam', city: 'Coimbatore', stars: 5, text: `Unbeatable taste. I've tried many online sweet shops, but Noble Bites is in a different league.` },
  { name: 'Surya Krishnamurthy', city: 'Mumbai', stars: 5, text: 'Placed a bulk wedding order — everything was perfectly packed and the taste was amazing. Highly recommend!' },
];

const features = [
  { icon: Truck, title: 'Free Delivery', desc: 'On all orders above ₹599 nationwide.', color: 'bg-blue-50   text-blue-500' },
  { icon: ShieldCheck, title: 'Quality Guaranteed', desc: '100% natural, no artificial preservatives.', color: 'bg-green-50  text-green-500' },
  { icon: Recycle, title: 'Eco Packaging', desc: 'Sustainable, biodegradable packaging only.', color: 'bg-amber-50  text-amber-500' },
  { icon: Star, title: '4.9★ Rated', desc: 'Loved by 10,000+ satisfied customers.', color: 'bg-rose-50   text-rose-500' },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => { fetchFeaturedProducts(); }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PRODUCTS);
      const data = response.data;
      setFeaturedProducts(data?.length > 0 ? data.slice(0, 4) : fallbackProducts.slice(0, 4));
    } catch {
      setFeaturedProducts(fallbackProducts.slice(0, 4));
    }
  };

  const prev = () => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setTestimonialIdx(i => (i + 1) % testimonials.length);

  const t = testimonials[testimonialIdx];

  return (
    <div className="w-full overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#FFF0F0] via-[#FFF8F4] to-[#F9C8C8] px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
        {/* Soft radial blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm">
              <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
              Authentic Tamil Nadu Snacks &amp; Sweets
            </div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold text-brand-primary leading-tight">
              Relive The<br />
              Taste of{' '}
              <span className="relative inline-block text-[#D97777]">
                Tamil Nadu
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10 Q100 2 198 10" stroke="#D97777" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-brand-text/70 italic font-medium max-w-lg leading-relaxed">
              "Handmade with heritage and heart. Our snacks &amp; sweets are a timeless art loved by families for over 25 years!"
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg transform -rotate-1">
                UP TO <span className="text-3xl">50%</span> OFF
              </div>
              <Link
                to="/menu"
                className="flex items-center gap-2 bg-brand-primary hover:bg-[#7a2626] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Order Now <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all"
              >
                Our Story
              </Link>
            </div>

            {/* mini stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[['10k+', 'Happy Customers'], ['25+', 'Years Old'], ['4.9★', 'Rating']].map(([val, lab]) => (
                <div key={lab}>
                  <span className="font-heading text-2xl font-bold text-brand-primary">{val}</span>
                  <p className="text-xs text-brand-text/50 font-medium">{lab}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop"
                alt="Sweets Platter"
                className="rounded-3xl shadow-2xl object-cover h-64 w-full translate-y-6 hover:-translate-y-0 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1605197584547-c93aa1cd3d52?q=80&w=800&auto=format&fit=crop"
                alt="Murukku"
                className="rounded-3xl shadow-2xl object-cover h-64 w-full hover:translate-y-2 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop"
                alt="Laddoo"
                className="rounded-3xl shadow-2xl object-cover h-48 w-full col-span-2 mx-auto -translate-y-3 hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-gray-100 flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-bold text-brand-text text-sm">State Award Winner</p>
                <p className="text-xs text-brand-text/50">Food Heritage 2012</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-bold text-brand-text mb-1">{title}</h3>
                <p className="text-sm text-brand-text/55 leading-snug">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ══ */}
      <section className="py-24 px-4 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-4"
          >
            <div>
              <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm mb-3">
                Chef's Picks
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-primary">Featured Delicacies</h2>
              <p className="text-brand-text/60 mt-2 max-w-lg">
                Our most-loved sweets and snacks, prepared fresh daily using traditional recipes.
              </p>
            </div>
            <Link
              to="/menu"
              className="flex items-center gap-2 border-2 border-brand-primary text-brand-primary font-bold py-3 px-7 rounded-full hover:bg-brand-primary hover:text-white transition-all flex-shrink-0"
            >
              View Full Menu <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product._id || product.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HERITAGE STRIP ══ */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#8B2E2E] to-[#D97777] text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold tracking-widest uppercase">
              25+ Years of Heritage
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
              A Tradition You Can<br />
              <span className="text-[#FFD6A5]">Taste in Every Bite</span>
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">
              From our humble kitchen in Ranipet to doorsteps across India — Noble Bites carries the soul of Tamil Nadu in every handmade treat.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-brand-primary transition-all"
            >
              Read Our Story <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl scale-95" />
            <img
              src="https://images.unsplash.com/photo-1607478900766-efe13248b125?q=80&w=900&auto=format&fit=crop"
              alt="Traditional sweet making"
              className="relative rounded-3xl shadow-2xl w-full object-cover h-80"
            />
            <blockquote className="absolute -bottom-5 left-6 right-6 bg-white text-brand-text rounded-2xl px-5 py-4 shadow-xl">
              <p className="font-heading text-brand-primary font-bold">"உணவே மருந்து"</p>
              <p className="text-xs text-brand-text/50 mt-0.5">Food is medicine — Tamil proverb</p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm mb-4">
              What Our Customers Say
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text">Stories of Joy</h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-brand-bg rounded-3xl p-10 shadow-md border border-brand-primary/10 text-center"
          >
            {/* stars */}
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="font-heading text-xl md:text-2xl text-brand-text leading-relaxed italic mb-7 max-w-2xl mx-auto">
              "{t.text}"
            </p>
            <div>
              <p className="font-bold text-brand-primary">{t.name}</p>
              <p className="text-sm text-brand-text/50">{t.city}</p>
            </div>

            {/* Nav */}
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-brand-primary/30 flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all text-brand-primary">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`rounded-full transition-all ${i === testimonialIdx ? 'w-6 h-2.5 bg-brand-primary' : 'w-2.5 h-2.5 bg-brand-primary/25'}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border-2 border-brand-primary/30 flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all text-brand-primary">
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ NEWSLETTER / CTA ══ */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#FFF0F0] to-[#F9C8C8]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm">
            🎉 Special Offer
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text">
            Ready to Order?
          </h2>
          <p className="text-brand-text/65 text-lg">
            Explore over 50+ handcrafted traditional sweets and snacks. Free delivery on orders above ₹599!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/menu"
              className="flex items-center justify-center gap-2 bg-brand-primary text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[#7a2626] hover:-translate-y-0.5 transition-all text-lg"
            >
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary font-bold px-10 py-4 rounded-full hover:bg-brand-primary hover:text-white transition-all text-lg"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
