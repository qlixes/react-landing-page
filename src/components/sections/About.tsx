import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe2, Factory, History, Smile, ArrowRight, Crosshair, Flag } from 'lucide-react';
import iso9001 from '@/assets/iso9001.jpg';
import Counter from '@/components/ui/Counter';

export default function About() {
    const { t } = useTranslation();

    const stats = [
        { value: '15+', label: t('about.stats.countries'), icon: Globe2 },
        { value: '1000+', label: t('about.stats.machines'), icon: Factory },
        { value: '30+', label: t('about.stats.experience'), icon: History },
        { value: '98%', label: t('about.stats.satisfaction'), icon: Smile },
    ];

    const vision = t('about.vision.description', { returnObjects: true }) as String[];
    const mission = t('about.mission.description', { returnObjects: true }) as String[];
    const description = t('about.brand.description', { returnObjects: true }) as String[];

    return (
        <section id="about" className="bg-white">
            <div className="container mx-auto px-4">

                {/* PHASE 1: Narrative */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
                    <div className="lg:col-span-6">
                        <span className="text-gold-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                            {t('about.badge')}
                        </span>
                        {/* Baris 1: Fokus pada Expertise dengan Dekorasi */}
                        <h2 className="text-4xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                            {t('about.title_part1')}{" "}
                            <span className="font-cormorant italic font-bold text-gold-primary relative inline-block">
                                {t('about.title_mark_part1')}
                            </span>
                        </h2>

                        {/* Baris 2: Fokus pada Customers dengan Kontras Warna */}
                        <h2 className="text-4xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                            {t('about.title_part2')}{" "}
                            <span className="font-cormorant italic font-bold text-gold-primary relative inline-block">
                                {t('about.title_mark_part2')}
                            </span>
                        </h2>
                        <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed mt-8">
                            {Array.isArray(description) && description.map((paragraph, idx) => (
                                < p key={idx} className="text-gray-900 font-medium leading-relaxed" >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 lg:col-start-8 space-y-6">
                        <div className="p-8 bg-gray-50 border-l-2 border-gold-primary hover:shadow-xl transition-all duration-500">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                <Crosshair className="w-4 h-4 text-gold-primary" />
                                {t(`about.vision.label`)}
                            </h3>
                            <div className="space-y-4">
                                {Array.isArray(vision) && vision.map((paragraph, idx) => (
                                    < p key={idx} className="text-gray-900 font-medium leading-relaxed" >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50 border-l-2 border-gold-primary hover:shadow-xl transition-all duration-500">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                <Flag className="w-4 h-4 text-gold-primary" />
                                {t(`about.mission.label`)}
                            </h3>
                            <ul className="space-y-3">
                                {Array.isArray(mission) && mission.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-900 font-medium leading-relaxed">
                                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Brand Trust Section: Overlay Positioning */}
                <div className="relative z-20">
                    <div className="flex flex-row items-center justify-center gap-4 md:gap-8 px-4">

                        {/* ISO & Slogan Flex Wrapper */}
                        <div className="flex flex-row items-center gap-4 md:gap-8 relative z-30">

                            {/* 1. Floating ISO Logo - Forced Top Layer */}
                            <motion.div
                                animate={{ y: [0, -8, 0], rotateZ: [0, 0.5, -0.5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative shrink-0"
                            >
                                <div className="absolute inset-0 bg-white/50 blur-xl rounded-full" />
                                <img
                                    src={iso9001}
                                    crossOrigin="anonymous"
                                    alt="ISO 9001"
                                    className="w-32 h-auto md:w-48 relative z-40 drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                                />
                            </motion.div>

                            {/* 2. Slogan with Consistent Alignment */}
                            <div className="flex items-center gap-4 md:gap-8">
                                <div className="h-10 md:h-16 w-px bg-gray-200" />
                                <div className="flex flex-col">
                                    <p className="font-cormorant font-bold italic text-lg md:text-4xl text-gray-800 leading-none">
                                        "{t('about.brand.slogan')}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PHASE 2: Global Counter */}
                <div className="relative mb-24 md:mb-32 pt-12 md:pt-16">
                    {/* 1. Enhanced Global Counter Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-visible rounded-[2.5rem] border border-gold-200/30 bg-gradient-to-b from-[#fffdfa] to-[#fcf8f1] shadow-[0_40px_100px_-20px_rgba(212,175,55,0.08)]"
                    >
                        {/* Grid Container dengan Border Luar Tunggal pada Mobile */}
                        <div className="grid grid-cols-2 md:grid-cols-4 relative z-10">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={i}
                                        className="relative flex flex-col items-center text-center p-10 md:p-16 overflow-hidden md:border-l md:first:border-l-0 border-gold-100/10"
                                    >

                                        <div className="relative z-10 flex flex-col items-center">
                                            {/* Ikon dengan Floating Animation - Fix TS Error */}
                                            <motion.div
                                                initial={{ y: 10, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{
                                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                                                    opacity: { duration: 0.5, delay: i * 0.1 + 0.4 }
                                                }}
                                                className="mb-6"
                                            >
                                                <Icon className="w-6 h-6 text-gold-primary" strokeWidth={1.5} />
                                            </motion.div>

                                            {/* Angka - Menggunakan Font Inheritance */}
                                            <div className="overflow-hidden mb-2">
                                                <motion.div
                                                    initial={{ y: "100%" }}
                                                    whileInView={{ y: 0 }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                                                    className="text-5xl md:text-6xl font-inherit font-bold text-slate-900 leading-none tracking-tight"
                                                >
                                                    <Counter value={parseInt(stat.value)} delay={i * 0.1 + 0.5} />
                                                    {stat.value.includes('+') && <span>+</span>}
                                                    {stat.value.includes('%') && <span>%</span>}
                                                </motion.div>
                                            </div>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: i * 0.1 + 0.6 }}
                                            className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-slate-400 leading-relaxed max-w-[150px]"
                                        >
                                            {stat.label}
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* 2. Idea for CTA - Elevated Gold Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="h-10 w-px bg-gradient-to-b from-gold-300 to-transparent mb-6"></div>
                        <button className="h-20 md:h-18 relative overflow-hidden px-10 md:px-12 bg-gold-primary/50 border border-gold-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-105">
                            {/* Gold Gradient Layer on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative flex items-center gap-4 z-10">
                                <span className="text-[11px] uppercase tracking-[0.4em] font-black">
                                    {t('about.learn_more')}
                                </span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                            </div>
                        </button>
                    </motion.div>
                </div >

            </div >
        </section >
    );
}