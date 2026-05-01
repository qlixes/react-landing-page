import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Settings, Info, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Product() {
    const { t } = useTranslation();
    const productLists = t('product.lists', { returnObjects: true }) as any[];
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'component'>('overview');

    const selectedProduct = selectedIdx !== null ? productLists[selectedIdx] : null;

    return (
        <section id="products" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                
                <div className="max-w-3xl mb-16">
                    <h2 className="text-5xl font-bold text-slate-900 uppercase tracking-tighter mb-4">
                        Featured Solutions
                    </h2>
                    <div className="w-20 h-1.5 bg-gold-primary" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {productLists.map((product, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            /* overflow-hidden krusial untuk memotong sudut footer agar tidak bocor putih */
                            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl flex flex-col cursor-pointer"
                            onClick={() => {
                                setSelectedIdx(idx);
                                setActiveTab('overview');
                            }}
                        >
                            {/* Background Image - Pastikan file ada di /public/assets/products/ */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={`/assets/products/${product.background}`} 
                                    alt={product.label}
                                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[1.5s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-950" />
                            </div>

                            {/* CARD BODY (Header dihapus, Judul langsung naik) */}
                            <div className="relative z-10 p-10 flex-grow flex flex-col justify-end">
                                <h3 className="text-3xl font-bold text-white uppercase mb-4 leading-tight group-hover:text-gold-primary transition-colors">
                                    {product.label}
                                </h3>
                                <p className="text-slate-300 text-sm italic font-medium leading-relaxed opacity-90 line-clamp-3">
                                    {product.slogan}
                                </p>
                            </div>

                            {/* CARD FOOTER - Menggunakan warna solid & menghapus border transparan penyebab titik putih */}
                            <div className="relative z-10 px-10 py-7 bg-slate-900/80 border-t border-white/5 flex items-center justify-between group-hover:bg-gold-primary transition-all duration-300">
                                <span className="text-white group-hover:text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em]">
                                    Explore Solution
                                </span>
                                <ArrowRight className="w-5 h-5 text-gold-primary group-hover:text-slate-900 group-hover:translate-x-2 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Detail Overlay System */}
                <AnimatePresence>
                    {selectedIdx !== null && selectedProduct && (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setSelectedIdx(null)}
                                className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[100]"
                            />
                            <motion.div 
                                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                                className="fixed right-0 top-0 h-full w-full lg:w-[60%] bg-white z-[101] shadow-2xl overflow-y-auto"
                            >
                                <div className="p-8 lg:p-20">
                                    <button 
                                        onClick={() => setSelectedIdx(null)}
                                        className="mb-12 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase font-black text-xs tracking-widest"
                                    >
                                        <X className="w-5 h-5" /> Close Details
                                    </button>

                                    <div className="grid gap-8 mb-16">
                                        <h3 className="text-5xl font-bold text-slate-900 uppercase leading-tight">{selectedProduct.label}</h3>
                                        <p className="text-xl text-gold-primary italic border-l-4 border-gold-primary pl-6 leading-relaxed">{selectedProduct.slogan}</p>
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex gap-8 border-b border-gray-100 mb-10">
                                        {(['overview', 'component'] as const).map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all border-b-2
                                                    ${activeTab === tab ? 'border-gold-primary text-slate-900' : 'border-transparent text-slate-300'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="grid lg:grid-cols-12 gap-12">
                                        <div className="lg:col-span-7 space-y-6">
                                            {selectedProduct[activeTab].description.map((p: string, i: number) => (
                                                <p key={i} className="text-slate-600 text-lg leading-relaxed">{p}</p>
                                            ))}
                                        </div>
                                        <div className="lg:col-span-5 bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                                            <h4 className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest text-slate-400 mb-8"><Package className="w-4 h-4 text-gold-primary" /> Technical Specifications</h4>
                                            <ul className="space-y-4">
                                                {selectedProduct[activeTab].list.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 font-bold text-sm text-slate-800"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0" />{item}</li>
                                                ))}
                                            </ul>
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