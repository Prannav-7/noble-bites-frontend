import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Send, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
    }),
};

const locations = [
    {
        city: 'Ranipet',
        pincode: '631102',
        address: '14, Gandhi Nagar, Ranipet District',
        phone: '+91 70109 84588',
        hours: 'Mon – Sat: 9 AM – 9 PM',
        emoji: '🏠',
    },
    {
        city: 'Coimbatore',
        pincode: '641402',
        address: '78, RS Puram, Coimbatore District',
        phone: '+91 70109 84588',
        hours: 'Mon – Sun: 8 AM – 10 PM',
        emoji: '🏪',
    },
    {
        city: 'Chennai',
        pincode: '600001',
        address: '22, Anna Salai, Chennai District',
        phone: '+91 70109 84588',
        hours: 'Mon – Sun: 9 AM – 11 PM',
        emoji: '🏬',
    },
];

const faqs = [
    {
        q: 'Do you offer nationwide delivery?',
        a: 'Yes! We deliver across India. Orders placed before 2 PM are dispatched the same day from our nearest hub.',
    },
    {
        q: 'How long do your sweets and snacks stay fresh?',
        a: 'Our products typically stay fresh for 15–30 days when stored in a cool, dry place. The exact shelf life is printed on each package.',
    },
    {
        q: 'Can I place a bulk/wedding order?',
        a: 'Absolutely! We love special-occasion orders. Please contact us at least 7 days in advance via the form or phone for bulk enquiries.',
    },
    {
        q: 'Are your products vegetarian?',
        a: 'Yes, 100%. All Noble Bites products are pure vegetarian and made without any non-vegetarian ingredients.',
    },
    {
        q: 'Do you have custom gift box options?',
        a: 'Yes! We offer beautifully packaged gift boxes perfect for festivals, weddings, and corporate gifting. Reach out to discuss customisation.',
    },
];

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error('Please fill in all required fields.');
            return;
        }
        setSending(true);
        try {
            await axios.post(API_ENDPOINTS.CONTACT, form);
            toast.success('Message sent! We\'ll get back to you within 24 hours. 🎉');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Contact form error:', error);
            toast.error(error.response?.data?.message || 'Failed to send message. Please try again later.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="w-full overflow-x-hidden">

            {/* ── Hero Banner ── */}
            <section className="relative min-h-[48vh] flex items-center justify-center bg-gradient-to-br from-[#8B2E2E] to-[#D97777] overflow-hidden px-4">
                <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                <motion.div
                    className="relative z-10 text-center text-white max-w-3xl"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-5 py-1 mb-6 rounded-full bg-white/20 text-sm font-semibold tracking-widest uppercase">
                        Get In Touch
                    </span>
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-5 leading-tight">
                        We'd Love to <span className="text-[#FFD6A5]">Hear From You</span>
                    </h1>
                    <p className="text-lg text-white/80 max-w-xl mx-auto">
                        Questions, bulk orders, feedback, or just want to say hi — our team is here and ready to help.
                    </p>
                </motion.div>
            </section>

            {/* ── Contact Form + Info ── */}
            <section className="py-24 px-4 bg-brand-bg">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">

                    {/* Left: Info cards */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <h2 className="font-heading text-3xl font-bold text-brand-text mb-2">Contact Info</h2>
                        <p className="text-brand-text/60 mb-6">Reach us through any of the channels below. We typically respond within a few hours.</p>

                        {[
                            { icon: Phone, label: 'Phone & WhatsApp', value: '+91 70109 84588', sub: 'Mon–Sat, 9 AM–9 PM', color: 'bg-rose-50 text-rose-500' },
                            { icon: Mail, label: 'Email', value: 'ran17062005@gmail.com', sub: 'We reply within 24 hrs', color: 'bg-blue-50 text-blue-500' },
                            { icon: Clock, label: 'Business Hours', value: 'Mon – Sun', sub: '8:00 AM – 10:00 PM', color: 'bg-amber-50 text-amber-500' },
                        ].map(({ icon: Icon, label, value, sub, color }) => (
                            <div key={label} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                                    <Icon size={22} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-brand-text/40 uppercase tracking-wider mb-0.5">{label}</p>
                                    <p className="font-semibold text-brand-text">{value}</p>
                                    <p className="text-xs text-brand-text/50">{sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Social */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <p className="text-sm font-semibold text-brand-text/40 uppercase tracking-wider mb-4">Follow Us</p>
                            <div className="flex gap-3">
                                {[
                                    { Icon: Instagram, label: 'Instagram', bg: 'bg-gradient-to-br from-pink-500 to-purple-600' },
                                    { Icon: Facebook, label: 'Facebook', bg: 'bg-blue-600' },
                                    { Icon: Youtube, label: 'YouTube', bg: 'bg-red-600' },
                                ].map(({ Icon, label, bg }) => (
                                    <a
                                        key={label}
                                        href="#"
                                        title={label}
                                        className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform`}
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100"
                    >
                        <h2 className="font-heading text-3xl font-bold text-brand-text mb-2">Send a Message</h2>
                        <p className="text-brand-text/50 mb-8 text-sm">Fill in the form below and we'll get back to you as soon as possible.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-brand-text/70 mb-1.5">Your Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Eg. Meena Kumar"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-brand-bg/40 text-sm transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-brand-text/70 mb-1.5">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-brand-bg/40 text-sm transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-brand-text/70 mb-1.5">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Eg. Bulk order enquiry"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-brand-bg/40 text-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-brand-text/70 mb-1.5">Message *</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Tell us how we can help you..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-brand-bg/40 text-sm resize-none transition"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full flex items-center justify-center gap-3 bg-brand-primary hover:bg-[#7a2626] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 text-base"
                            >
                                {sending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* ── Our Locations ── */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm mb-4">
                            Visit Us
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text">Our Locations</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {locations.map(({ city, pincode, address, phone, hours, emoji }, i) => (
                            <motion.div
                                key={city}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group bg-brand-bg rounded-2xl p-7 border border-brand-primary/10 hover:border-brand-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">{emoji}</div>
                                <h3 className="font-heading text-2xl font-bold text-brand-primary mb-1">{city}</h3>
                                <p className="text-xs text-brand-text/40 mb-4 font-semibold">PIN: {pincode}</p>
                                <div className="space-y-2.5 text-sm text-brand-text/70">
                                    <div className="flex items-start gap-2">
                                        <MapPin size={15} className="text-brand-primary mt-0.5 flex-shrink-0" />
                                        <span>{address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={15} className="text-brand-primary flex-shrink-0" />
                                        <span>{phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={15} className="text-brand-primary flex-shrink-0" />
                                        <span>{hours}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Embedded Map placeholder */}
                    <motion.div
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-12 rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-72 bg-gradient-to-br from-brand-bg to-[#F9C8C8] flex items-center justify-center"
                    >
                        <div className="text-center text-brand-text/50">
                            <MapPin size={48} className="mx-auto mb-3 text-brand-primary/40" />
                            <p className="font-heading text-xl font-semibold text-brand-text/40">Map coming soon</p>
                            <p className="text-sm mt-1">Search "Noble Bites" on Google Maps to find us</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-24 px-4 bg-gradient-to-br from-[#FFF0F0] to-[#F9C8C8]">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block px-4 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-semibold text-sm mb-4">
                            FAQ
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text">Frequently Asked Questions</h2>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map(({ q, a }, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-brand-text hover:text-brand-primary transition-colors"
                                >
                                    <span>{q}</span>
                                    {openFaq === i ? (
                                        <ChevronUp size={20} className="text-brand-primary flex-shrink-0" />
                                    ) : (
                                        <ChevronDown size={20} className="text-brand-text/40 flex-shrink-0" />
                                    )}
                                </button>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="px-6 pb-5 text-brand-text/60 text-sm leading-relaxed border-t border-gray-100"
                                    >
                                        <p className="pt-4">{a}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactPage;
