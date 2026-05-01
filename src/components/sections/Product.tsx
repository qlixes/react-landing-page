import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowRight, Settings, Info, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProductItem {
    label: string;
    slogan: string;
    overview: { description: string[]; list: string[] };
    component: { description: string[]; list: string[] };
    list: { name: string; image: string }[];
}

export default function Product() {
    const { t } = useTranslation();
    const productLists = t('product.lists', { returnObjects: true }) as ProductItem[];
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'component'>('overview');

    const selectedProduct = selectedIdx !== null ? productLists[selectedIdx] : null;

    return (
        <section id="products" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-12">
                    <div className="max-w-2xl">
                        <span className="text-gold-primary font-black tracking-widest uppercase text-xs mb-3 block">
                            {t('product.badge')}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold text-slate-900 leading-none tracking-tighter uppercase">
                            Premium <br /> Industrial Solutions
                        </h2>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productLists.map((product, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-end p-8 cursor-pointer shadow-xl"
                            onClick={() => {
                                setSelectedIdx(idx);
                                setActiveTab('overview');
                            }}
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={`/assets/products/${product.list[0].image}`} 
                                    alt={product.label}
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                            </div>

                            {/* Card Content */}
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-gold-primary flex items-center justify-center mb-6 transform group-hover:rotate-90 transition-transform duration-500">
                                    <Plus className="w-6 h-6 text-slate-900" />
                                </div>
                                <h3 className="text-3xl font-bold text-white uppercase mb-2 leading-tight">
                                    {product.label}
                                </h3>
                                <p className="text-gold-primary/80 font-medium text-sm italic line-clamp-2">
                                    {product.slogan}
                                </p>
                                <div className="mt-6 flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Details <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Interaction Drawer / Detail Overlay */}
                <AnimatePresence>
                    {selectedIdx !== null && selectedProduct && (
                        <>
                            {/* Backdrop */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedIdx(null)}
                                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100]"
                            />

                            {/* Detail Panel */}
                            <motion.div 
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 h-full w-full lg:w-[60%] bg-white z-[101] shadow-2xl overflow-y-auto"
                            >
                                <div className="p-8 lg:p-16">
                                    {/* Close button */}
                                    <button 
                                        onClick={() => setSelectedIdx(null)}
                                        className="mb-12 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase font-bold text-xs tracking-widest"
                                    >
                                        <X className="w-5 h-5" /> Close Panel
                                    </button>

                                    {/* Title & Slogan */}
                                    <div className="mb-12">
                                        <h3 className="text-4xl md:text-6xl font-bold text-slate-900 uppercase tracking-tighter mb-4">
                                            {selectedProduct.label}
                                        </h3>
                                        <p className="text-xl text-gold-primary font-serif italic">
                                            {selectedProduct.slogan}
                                        </p>
                                    </div>

                                    {/* Horizontal Mini Image Gallery */}
                                    <div className="flex gap-4 overflow-x-auto pb-6 mb-12 no-scrollbar">
                                        {selectedProduct.list.map((img, i) => (
                                            <div key={i} className="min-w-[200px] h-[150px] rounded-2xl overflow-hidden border border-gray-100">
                                                <img src={`/assets/products/${img.image}`} alt={img.name} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Interaction Tabs */}
                                    <div className="flex gap-4 border-b border-gray-100 mb-10">
                                        <button 
                                            onClick={() => setActiveTab('overview')}
                                            className={`pb-4 px-2 flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-all border-b-2
                                                ${activeTab === 'overview' ? 'border-gold-primary text-slate-900' : 'border-transparent text-slate-300'}`}
                                        >
                                            <Info className="w-4 h-4" /> Machine Overview
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab('component')}
                                            className={`pb-4 px-2 flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-all border-b-2
                                                ${activeTab === 'component' ? 'border-gold-primary text-slate-900' : 'border-transparent text-slate-300'}`}
                                        >
                                            <Settings className="w-4 h-4" /> Components
                                        </button>
                                    </div>

                                    {/* Dynamic Content */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                        <div className="lg:col-span-7 space-y-6">
                                            {selectedProduct[activeTab].description.map((p, i) => (
                                                <p key={i} className="text-slate-500 text-lg leading-relaxed">{p}</p>
                                            ))}
                                        </div>

                                        <div className="lg:col-span-5">
                                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                                                <h4 className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest text-slate-400 mb-6">
                                                    <Package className="w-4 h-4 text-gold-primary" /> Key Includes
                                                </h4>
                                                <ul className="space-y-4">
                                                    {selectedProduct[activeTab].list.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3 font-bold text-sm text-slate-800 leading-tight">
                                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}