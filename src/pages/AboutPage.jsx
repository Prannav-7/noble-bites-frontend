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

const timeline = [
    { year: '1998', event: 'Noble Bites was founded in a small kitchen in Ranipet, Tamil Nadu.' },
    { year: '2005', event: 'Expanded to Coimbatore with a dedicated production facility.' },
    { year: '2012', event: 'Won the State Food Heritage Award for preserving traditional snack recipes.' },
    { year: '2018', event: 'Launched our Chennai outlet and started serving across Tamil Nadu.' },
    { year: '2023', event: 'Went online — bringing authentic Tamil flavours to doorsteps nationwide.' },
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

            {/* ── Timeline ── */}
            <section className="py-24 px-4 bg-gradient-to-br from-[#FFF0F0] to-[#F9C8C8]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm mb-4">
                            Our Journey
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text">Milestones That Matter</h2>
                    </motion.div>

                    <div className="relative">
                        {/* vertical line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-primary/20 -translate-x-1/2" />

                        <div className="space-y-12">
                            {timeline.map(({ year, event }, i) => (
                                <motion.div
                                    key={year}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Content box */}
                                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-brand-primary/10">
                                            <span className="font-heading text-2xl font-bold text-brand-primary block mb-2">{year}</span>
                                            <p className="text-brand-text/70 text-sm leading-relaxed">{event}</p>
                                        </div>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-brand-primary border-4 border-white shadow-md -translate-x-1/2 top-6" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
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
