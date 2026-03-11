import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Award, Clock, Users, Star, ChefHat, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
    }),
};

const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Customers' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Clock, value: '25+', label: 'Years of Tradition' },
    { icon: Award, value: '12+', label: 'Awards Won' },
];

const values = [
    {
        icon: Heart,
        title: 'Made with Love',
        desc: 'Every batch is prepared by hand, the same way our grandmothers did it — with patience, care, and a whole lot of heart.',
        color: 'bg-rose-50 text-rose-500',
    },
    {
        icon: Leaf,
        title: '100% Natural',
        desc: 'No artificial colours, no preservatives. We use only fresh, locally sourced ingredients that honour the land and the tradition.',
        color: 'bg-green-50 text-green-500',
    },
    {
        icon: ChefHat,
        title: 'Master Recipes',
        desc: 'Our recipes have been passed down through generations. Each sweet and snack carries the wisdom of our ancestors.',
        color: 'bg-amber-50 text-amber-500',
    },
    {
        icon: Shield,
        title: 'Quality Assured',
        desc: 'We maintain strict hygiene and quality checks at every step so you can trust every bite that reaches your family.',
        color: 'bg-blue-50 text-blue-500',
    },
];

const process = [
    { step: '01', title: 'Source Fresh Ingredients', desc: 'We hand-pick the finest rice flour, jaggery, sesame seeds, and spices from trusted local farmers in Tamil Nadu every morning.', emoji: '🌾' },
    { step: '02', title: 'Traditional Preparation', desc: 'Our experienced artisans prepare each batch using age-old family recipes — no shortcuts, no machinery for the critical steps.', emoji: '👩‍🍳' },
    { step: '03', title: 'Hand-Crafted with Care', desc: 'Every murukku twisted by hand, every laddu rolled with love. Each snack is shaped individually to preserve its authentic character.', emoji: '🤲' },
    { step: '04', title: 'Quality Check & Packaging', desc: 'Each batch is tasted and inspected before being packed in hygienic, eco-friendly packaging to preserve freshness and flavour.', emoji: '✅' },
];

const categories = [
    { name: 'Murukku', desc: 'Crispy, hand-twisted spirals made from rice flour and seasoned with cumin, sesame & asafoetida.', emoji: '🌀', bg: 'from-amber-50 to-orange-50', border: 'border-amber-200' },
    { name: 'Sweets', desc: 'Melt-in-mouth burfis, laddus, halwas and more — sweetened with jaggery or sugar the traditional way.', emoji: '🍮', bg: 'from-pink-50 to-rose-50', border: 'border-pink-200' },
    { name: 'Biscuits', desc: 'Freshly baked nei biscuits, butter biscuits and ragi biscuits, rich in flavour and naturally crisp.', emoji: '🍪', bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-200' },
    { name: 'Candies & Mittai', desc: 'Traditional village-style candies — Kairu Mittai, Javvu Mittai, Jeera Mittai and more nostalgic favourites.', emoji: '🍬', bg: 'from-purple-50 to-pink-50', border: 'border-purple-200' },
    { name: 'Mixture & Snacks', desc: 'Crunchy special mixture, omapodi, ribbon pakoda and kara sev — perfect tea-time companions.', emoji: '🥣', bg: 'from-green-50 to-teal-50', border: 'border-green-200' },
    { name: 'Laddus & Urundai', desc: 'Boondhi laddu, rava laddu, ellu urundai and pottukadalai urundai — festive favourites for every occasion.', emoji: '⚽', bg: 'from-red-50 to-rose-50', border: 'border-red-200' },
];

const AboutPage = () => {
    return (
        <div className="w-full overflow-x-hidden">

            {/* ── Hero Banner ── */}
            <section className="relative min-h-[55vh] flex items-center justify-center bg-gradient-to-br from-[#8B2E2E] to-[#D97777] overflow-hidden px-4">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                <motion.div
                    className="relative z-10 text-center text-white max-w-3xl"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-5 py-1 mb-6 rounded-full bg-white/20 text-sm font-semibold tracking-widest uppercase">
                        Our Story
                    </span>
                    <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Rooted in Tradition,<br />
                        <span className="text-[#FFD6A5]">Crafted with Love</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                        For over 25 years, Noble Bites has been bringing the authentic taste of Tamil Nadu to families across India — one handmade bite at a time.
                    </p>
                </motion.div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="bg-white py-10 px-4 shadow-sm">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map(({ icon: Icon, value, label }, i) => (
                        <motion.div
                            key={label}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-1">
                                <Icon size={22} className="text-brand-primary" />
                            </div>
                            <span className="font-heading text-3xl font-bold text-brand-primary">{value}</span>
                            <span className="text-sm text-brand-text/60 font-medium">{label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Brand Story ── */}
            <section className="py-24 px-4 bg-brand-bg">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-brand-primary rounded-3xl opacity-10 blur-2xl scale-110" />
                        <img
                            src="https://images.unsplash.com/photo-1607478900766-efe13248b125?q=80&w=1000&auto=format&fit=crop"
                            alt="Traditional sweet making"
                            className="relative rounded-3xl shadow-2xl w-full object-cover h-[420px]"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-brand-primary text-white rounded-2xl px-6 py-4 shadow-xl">
                            <p className="font-heading text-3xl font-bold">25+</p>
                            <p className="text-sm text-white/80">Years of Heritage</p>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm">
                            Who We Are
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text leading-tight">
                            A Family Kitchen,<br />Now at Your Doorstep
                        </h2>
                        <p className="text-brand-text/70 text-lg leading-relaxed">
                            Noble Bites was born in 1998 in a humble kitchen in Ranipet, Tamil Nadu. What started as a passion for preserving the authentic flavours of our culture has grown into a beloved brand trusted by thousands of families.
                        </p>
                        <p className="text-brand-text/70 leading-relaxed">
                            Our founder, Mahalakshmi Ramasamy, started making murukkus and adhirasams using age-old family recipes. Today, her grandchildren carry forward that legacy — with the same firepit dedication, now backed by modern food safety standards.
                        </p>
                        <blockquote className="border-l-4 border-brand-primary pl-5 italic text-brand-primary font-heading text-xl">
                            "சுவையான உணவு — சுகமான வாழ்வு"<br />
                            <span className="text-sm text-brand-text/50 font-sans not-italic">Tasty food — a healthy life.</span>
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* ── Our Values ── */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm mb-4">
                            What We Stand For
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text">Our Core Values</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map(({ icon: Icon, title, desc, color }, i) => (
                            <motion.div
                                key={title}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5`}>
                                    <Icon size={26} />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-brand-text mb-3">{title}</h3>
                                <p className="text-brand-text/60 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How We Make It ── */}
            <section className="py-24 px-4 bg-gradient-to-br from-[#FFF0F0] to-[#F9C8C8]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm mb-4">
                            From Kitchen to Doorstep
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text">How We Make Our Snacks</h2>
                        <p className="text-brand-text/60 mt-3 max-w-xl mx-auto">Every bite you enjoy goes through a carefully crafted process rooted in tradition and honesty.</p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map(({ step, title, desc, emoji }, i) => (
                            <motion.div
                                key={step}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl border border-brand-primary/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                            >
                                <span className="absolute top-4 right-4 text-5xl opacity-10 font-heading font-bold text-brand-primary">{step}</span>
                                <div className="text-4xl mb-4">{emoji}</div>
                                <h3 className="font-heading text-lg font-bold text-brand-text mb-2">{title}</h3>
                                <p className="text-brand-text/60 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Product Categories ── */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm mb-4">
                            Explore Our Range
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text">What We Offer</h2>
                        <p className="text-brand-text/60 mt-3 max-w-xl mx-auto">Over 80 authentic products across 6 delicious categories — all made fresh, all made with love.</p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(({ name, desc, emoji, bg, border }, i) => (
                            <motion.div
                                key={name}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className={`bg-gradient-to-br ${bg} rounded-2xl p-7 border ${border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                            >
                                <div className="text-5xl mb-4">{emoji}</div>
                                <h3 className="font-heading text-xl font-bold text-brand-text mb-2">{name}</h3>
                                <p className="text-brand-text/65 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            to="/menu"
                            className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[#7a2626] transition-all hover:-translate-y-0.5 text-lg"
                        >
                            Browse All Products →
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-brand-primary text-white text-center">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto space-y-6"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold">Taste the Heritage Today</h2>
                    <p className="text-white/80 text-lg">
                        Explore our full range of traditional Tamil Nadu sweets and snacks, made fresh and delivered to your home.
                    </p>
                    <Link
                        to="/menu"
                        className="inline-block bg-white text-brand-primary font-bold px-10 py-4 rounded-full shadow-lg hover:bg-[#FFD6A5] transition-colors text-lg"
                    >
                        Explore Our Menu →
                    </Link>
                </motion.div>
            </section>

        </div>
    );
};

export default AboutPage;
