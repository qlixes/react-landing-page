import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Package, FileText, Cog, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Product() {
    const { t } = useTranslation();
    const productLists = t('product.lists', { returnObjects: true }) as any[];
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const selectedProduct = selectedIdx !== null ? productLists[selectedIdx] : null;

    return (
        <section id="products" className="py-24 bg-white">
            <div className="container mx-auto px-4">

                <div className="max-w-3xl mb-16">
                    <h2 className="text-5xl font-bold text-slate-900 uppercase tracking-tighter mb-4">
                        Our Products
                    </h2>
                    <div className="w-20 h-1.5 bg-gold-primary" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {productLists.map((product, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden bg-slate-950 shadow-2xl flex flex-col cursor-pointer"
                            onClick={() => setSelectedIdx(idx)}
                        >
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={`/assets/products/${product.background}`}
                                    alt={product.label}
                                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[1.5s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
                            </div>

                            <div className="relative z-10 p-10 flex-grow flex flex-col justify-end">
                                <h3 className="text-3xl font-bold text-white uppercase mb-4 leading-[1.1] group-hover:text-gold-primary transition-colors">
                                    {product.label}
                                </h3>
                                <p className="text-slate-300 text-sm italic font-medium leading-relaxed opacity-90 line-clamp-3">
                                    {product.slogan}
                                </p>
                            </div>

                            <div className="relative z-10 px-10 py-7 bg-slate-950 flex items-center justify-between group-hover:bg-gold-primary transition-all duration-300">
                                <span className="text-white group-hover:text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em]">
                                    Explore Solution
                                </span>
                                <ArrowRight className="w-5 h-5 text-gold-primary group-hover:text-slate-900 group-hover:translate-x-2 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>

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
                                className="fixed right-0 top-0 h-full w-full lg:w-[50%] bg-white z-[101] shadow-2xl overflow-y-auto"
                            >
                                <div className="p-8 lg:p-16">
                                    <button
                                        onClick={() => setSelectedIdx(null)}
                                        className="mb-10 flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors uppercase font-black text-[10px] tracking-widest group"
                                    >
                                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Close Details
                                    </button>

                                    <div className="mb-16">
                                        <h2 className="text-5xl font-black text-slate-900 uppercase leading-[0.9] mb-8 tracking-tighter">
                                            {selectedProduct.label}
                                        </h2>
                                        <div className="flex items-center gap-5">
                                            <div className="w-1.5 self-stretch min-h-[40px] bg-gold-primary rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)]" />

                                            <p className="text-xl text-slate-500 italic font-medium leading-relaxed">
                                                {selectedProduct.slogan}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-20">

                                        {/* SECTION: OVERVIEW */}
                                        <div className="relative">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-gold-primary shadow-xl">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Overview</h3>
                                                </div>
                                            </div>
                                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed pl-4 border-l-2 border-slate-50">
                                                {selectedProduct.overview.description.map((p: string, i: number) => (
                                                    <p key={i}>{p}</p>
                                                ))}
                                            </div>
                                        </div>

                                        {/* SECTION: MACHINE COMPONENTS */}
                                        <div className="relative">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-gold-primary shadow-xl">
                                                    <Cog className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Machine Components</h3>
                                                </div>
                                            </div>

                                            <div className="text-slate-600 text-lg leading-relaxed mb-10 pl-4 border-l-2 border-slate-50">
                                                {selectedProduct.component.description.map((p: string, i: number) => (
                                                    <p key={i}>{p}</p>
                                                ))}
                                            </div>

                                            {/* Technical Spec Box yang dipertegas */}
                                            <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                                                {/* Background Decorative Element */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />

                                                <div className="flex items-center gap-4 mb-10 relative z-10">
                                                    <div className="w-10 h-10 rounded-xl bg-gold-primary flex items-center justify-center">
                                                        <Package className="w-5 h-5 text-slate-900" />
                                                    </div>
                                                </div>

                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                                                    {selectedProduct.component.list.map((item: string, i: number) => (
                                                        <li key={i} className="flex items-start gap-4 group/item">
                                                            <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary group-hover/item:bg-gold-primary group-hover/item:text-slate-900 transition-colors">
                                                                <ChevronRight className="w-3 h-3" />
                                                            </div>
                                                            <span className="font-bold text-sm text-slate-300 group-hover/item:text-white transition-colors">
                                                                {item}
                                                            </span>
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