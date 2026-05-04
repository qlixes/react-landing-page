import { useState, useEffect } from 'react'; // ← tambah useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, FileText, Cog, ChevronRight, Eye, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Product() {
    const { t } = useTranslation();
    const productLists = t('product.lists', { returnObjects: true }) as any[];

    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [activeSubProduct, setActiveSubProduct] = useState<any | null>(null);

    const selectedProduct = selectedIdx !== null ? productLists[selectedIdx] : null;

    useEffect(() => {
        const isOpen = selectedIdx !== null || activeSubProduct !== null;
        document.body.style.overflow = isOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedIdx, activeSubProduct]);

    // Helper close — pastikan scroll selalu di-restore
    const closeSidebar = () => setSelectedIdx(null);
    const closeModal = () => setActiveSubProduct(null);

    // Helper cek string tidak kosong
    const hasContent = (value: string | undefined) =>
        typeof value === 'string' && value.trim() !== '';

    // Helper filter list dari string kosong
    const filterList = (list: string[] | undefined) =>
        (list ?? []).filter(item => hasContent(item));

    return (
        <section id="product" className="bg-white scroll-mt-32">
            <div className="container mx-auto px-4">

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-[2px] bg-gold-primary" />
                    <span className="text-gold-primary font-bold tracking-[0.4em] text-xs uppercase">
                        {t('product.badge')}
                    </span>
                </div>

                {/* Main Product Grid */}
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
                                {product.slogan && (
                                    <p className="text-slate-300 text-sm italic font-medium leading-relaxed opacity-90 line-clamp-3">
                                        {product.slogan}
                                    </p>
                                )}
                            </div>
                            <div className="relative z-10 px-10 py-7 bg-navy-gradient flex items-center justify-between group-hover:bg-gold-primary transition-all duration-300">
                                <span className="text-white group-hover:text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em]">
                                    {t('product.explore')}
                                </span>
                                <ArrowRight className="w-5 h-5 text-gold-primary group-hover:text-slate-900 group-hover:translate-x-2 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Detail Sidebar Overlay */}
                <AnimatePresence>
                    {selectedIdx !== null && selectedProduct && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={closeSidebar} // ← pakai helper
                                className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[100]"
                            />
                            <motion.div
                                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                                className="fixed right-0 top-0 h-full w-full lg:w-[55%] bg-white z-[101] shadow-2xl overflow-y-auto"
                            >
                                <div className="p-8 lg:p-16">
                                    <button
                                        onClick={closeSidebar} // ← pakai helper
                                        className="mb-10 flex items-center gap-2 text-red-500 border-2 border-red-500 py-2 px-4 hover:text-white hover:bg-red-500 transition-colors uppercase font-black text-[12px] tracking-widest group"
                                    >
                                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Close
                                    </button>

                                    <div className="mb-16">
                                        <h2 className="text-5xl font-black text-slate-900 uppercase leading-[0.9] mb-8 tracking-tighter">
                                            {selectedProduct.label}
                                        </h2>
                                        {selectedProduct.slogan && (
                                            <div className="flex items-center gap-5">
                                                <div className="w-1.5 self-stretch min-h-[40px] bg-gold-primary rounded-full" />
                                                <p className="text-xl text-slate-500 italic font-medium leading-relaxed">
                                                    {selectedProduct.slogan}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-20">
                                        {hasContent(selectedProduct.overview?.label) && (
                                            <div>
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-gold-primary shadow-xl">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-slate-900 uppercase">
                                                        {selectedProduct.overview.label}
                                                    </h3>
                                                </div>
                                                <div className="space-y-6 text-slate-600 text-lg leading-relaxed pl-4 border-l-2 border-gold-primary/30">
                                                    {selectedProduct.overview.description
                                                        ?.filter((desc: string) => hasContent(desc))
                                                        .map((desc: string, i: number) => (
                                                            <p key={i}>{desc}</p>
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        {hasContent(selectedProduct.component?.label) && filterList(selectedProduct.component?.list).length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-gold-primary shadow-xl">
                                                        <Cog className="w-6 h-6" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-slate-900 uppercase">
                                                        {selectedProduct.component.label}
                                                    </h3>
                                                </div>

                                                {/* Tambahkan Deskripsi Komponen di sini */}
                                                {selectedProduct.component.description && (
                                                    <p className="text-slate-600 text-lg leading-relaxed mb-8 pl-4 border-l-2 border-gold-primary/30">
                                                        {selectedProduct.component.description}
                                                    </p>
                                                )}

                                                <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                                        {filterList(selectedProduct.component.list).map((item: string, i: number) => (
                                                            <li key={i} className="flex items-start gap-4 group/item">
                                                                <div className="mt-1 flex items-center justify-center w-5 h-5 p-1 rounded-full bg-gold-primary/20 text-gold-primary group-hover/item:bg-gold-primary group-hover/item:text-slate-900 transition-colors">
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
                                        )}

                                        <div className="pb-20">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-gold-primary shadow-xl">
                                                    <Eye className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 uppercase">{t('product.gallery')}</h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {selectedProduct.list?.map((sub: any, i: number) => (
                                                    <motion.div
                                                        key={i}
                                                        whileHover={{ scale: 1.02 }}
                                                        onClick={() => setActiveSubProduct(sub)}
                                                        className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-slate-100 border-4 border-gold-primary"
                                                    >
                                                        <img
                                                            src={`/assets/products/${sub.image}`}
                                                            alt={sub.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white">
                                                                <Maximize2 className="w-5 h-5" />
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                                                            <p className="text-white font-bold text-xs uppercase tracking-wider">{sub.name}</p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Sub-Product Detail Modal */}
                <AnimatePresence>
                    {activeSubProduct && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={closeModal} // ← pakai helper
                                className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative w-full max-w-3xl bg-white overflow-hidden shadow-2xl flex flex-col border-2 border-gold-primary"
                            >
                                <button
                                    onClick={closeModal} // ← pakai helper
                                    className="absolute top-5 right-5 z-20 bg-slate-900/50 hover:bg-red-500 backdrop-blur-md p-2.5 rounded-full text-white transition-all duration-300 group"
                                >
                                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                </button>
                                <div className="w-full bg-slate-100 flex items-center justify-center">
                                    <img
                                        src={`/assets/products/${activeSubProduct.image}`}
                                        alt={activeSubProduct.name}
                                        className="w-full h-auto object-contain max-h-[70vh]"
                                    />
                                </div>
                                {activeSubProduct.description && activeSubProduct.description.trim() !== "" ? (
                                    <div className="p-8 md:p-12 flex flex-col items-center text-center bg-white">
                                        <div className="flex flex-col items-center mb-6">
                                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase leading-tight">
                                                {activeSubProduct.name}
                                            </h3>
                                            <div className="w-12 h-1 bg-gold-primary mt-4 rounded-full" />
                                        </div>
                                        <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-lg">
                                            {activeSubProduct.description}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="p-5 bg-slate-600 text-center w-full">
                                        <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">
                                            {activeSubProduct.name}
                                        </h3>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}