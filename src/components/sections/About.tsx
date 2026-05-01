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
        <section id="about" className="bg-white mt-12">
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
                        <div className="p-8 bg-navy-primary border-4 border-gold-primary hover:shadow-xl transition-all duration-500">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-primary mb-3 flex items-center gap-2">
                                <Crosshair className="w-4 h-4 text-gold-primary" />
                                {t(`about.vision.label`)}
                            </h3>
                            <div className="space-y-4">
                                {Array.isArray(vision) && vision.map((paragraph, idx) => (
                                    < p key={idx} className="text-white/80 font-medium leading-relaxed" >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 bg-navy-primary border-4 border-gold-primary hover:shadow-xl transition-all duration-500">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-primary mb-3 flex items-center gap-2">
                                <Flag className="w-4 h-4 text-gold-primary" />
                                {t(`about.mission.label`)}
                            </h3>
                            <ul className="space-y-3">
                                {Array.isArray(mission) && mission.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-white/80 font-medium leading-relaxed">
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
                    {/* 1. Global Counter Panel - Matching image_4acf80.jpg */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden border border-[#d4bc82] shadow-2xl"
                        style={{
                            // Gradien radial: Putih terang di tengah ke arah emas gandum di pinggir
                            background: "radial-gradient(circle at center, #ffffff 0%, #f7f0df 40%, #ebdcb2 100%)"
                        }}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 relative z-10">
                            {stats.map((stat, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="relative flex flex-col items-center justify-center text-center p-10 md:p-14 border-[#d4bc82]/40 md:border-l first:border-l-0 border-b md:border-b-0 last:border-b-0"
                                    >
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="overflow-hidden mb-2">
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                                    className="text-6xl md:text-7xl font-serif font-medium text-[#c5a044] leading-none tracking-tight flex items-baseline pb-2"
                                                >
                                                    <Counter value={parseInt(stat.value)} delay={i * 0.1 + 0.5} />
                                                    <span className="text-4xl ml-0.5">
                                                        {stat.value.includes('+') && '+'}
                                                        {stat.value.includes('%') && '%'}
                                                    </span>
                                                </motion.div>
                                            </div>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: i * 0.1 + 0.6 }}
                                            className="text-[11px] md:text-xs uppercase tracking-[0.25em] font-bold text-[#7a7468] leading-tight max-w-[140px] mt-2"
                                        >
                                            {stat.label}
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* 2. Elevated CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="flex flex-col items-center mt-12"
                    >
                        <button className="group relative overflow-hidden px-12 py-5 mt-12 bg-gold-primary/90 border-2 border-gold-primary transition-all duration-500">
                            <div className="absolute inset-0 bg-[#c5a044] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <div className="relative flex items-center gap-4 z-10">
                                <span className="text-[11px] uppercase tracking-[0.4em] font-bold group-hover:text-[#1a1a1a] transition-colors duration-500">
                                    {t('about.learn_more')}
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:text-[#1a1a1a] group-hover:translate-x-2 transition-all duration-500" />
                            </div>
                        </button>
                    </motion.div>
                </div>

            </div >
        </section >
    );
}