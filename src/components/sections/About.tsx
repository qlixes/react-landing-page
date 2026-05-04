import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Factory, History, Smile, ArrowRight, Crosshair, Flag, ChevronDown } from 'lucide-react';
import iso9001 from '@/assets/iso9001.jpg';
import Counter from '@/components/ui/Counter';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function About() {
    const { t } = useTranslation();

    const [openAccordion, setOpenAccordion] = useState<'vision' | 'mission' | null>(null);

    const toggleAccordion = (key: 'vision' | 'mission') => {
        setOpenAccordion(prev => (prev === key ? null : key));
    };

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
        <section id="about" className="bg-white mt-12 scroll-mt-32">
            <div className="container mx-auto px-4">

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">

                    {/* ── LEFT COLUMN ── */}
                    <div className="lg:col-span-5 flex flex-col gap-8">

                        {/* Badge */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-[2px] bg-gold-primary" />
                            <span className="text-gold-primary font-bold tracking-[0.4em] text-xs uppercase">
                                {t('about.badge')}
                            </span>
                            <div className="w-16 h-[2px] bg-gold-primary" />
                        </div>

                        {/* Title */}
                        <div>
                            <h2 className="text-4xl md:text-6xl font-cormorant text-gray-900 leading-[1.1] tracking-tight">
                                {t('about.title_part1')}{" "}
                                <span className="font-cormorant italic text-gold-primary">
                                    {t('about.title_mark_part1')}
                                </span>
                            </h2>
                            <h2 className="text-4xl md:text-6xl font-cormorant text-gray-900 leading-[1.1] tracking-tight">
                                {t('about.title_part2')}{" "}
                                <span className="font-cormorant italic text-gold-primary">
                                    {t('about.title_mark_part2')}
                                </span>
                            </h2>
                        </div>

                        {/* Accordion: Vision */}
                        <div className="border-4 border-gold-primary bg-navy-gradient overflow-hidden">
                            <button
                                onClick={() => toggleAccordion('vision')}
                                className="w-full flex items-center justify-between px-8 py-5"
                            >
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gold-primary flex items-center gap-2">
                                    <Crosshair className="w-4 h-4" />
                                    {t('about.vision.label')}
                                </h3>
                                <ChevronDown
                                    className={`w-4 h-4 text-gold-primary transition-transform duration-300 ${openAccordion === 'vision' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {openAccordion === 'vision' && (
                                    <motion.div
                                        key="vision-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-6 space-y-4 border-t border-gold-primary/30">
                                            <div className="w-10 h-[2px] bg-gold-primary mt-4" />
                                            {Array.isArray(vision) && vision.map((paragraph, idx) => (
                                                <p key={idx} className="text-white/80 font-medium leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Accordion: Mission */}
                        <div className="border-4 border-gold-primary bg-navy-gradient overflow-hidden">
                            <button
                                onClick={() => toggleAccordion('mission')}
                                className="w-full flex items-center justify-between px-8 py-5"
                            >
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gold-primary flex items-center gap-2">
                                    <Flag className="w-4 h-4" />
                                    {t('about.mission.label')}
                                </h3>
                                <ChevronDown
                                    className={`w-4 h-4 text-gold-primary transition-transform duration-300 ${openAccordion === 'mission' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {openAccordion === 'mission' && (
                                    <motion.div
                                        key="mission-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-6 border-t border-gold-primary/30">
                                            <div className="w-10 h-[2px] bg-gold-primary mt-4 mb-4" />
                                            <ul className="space-y-3">
                                                {Array.isArray(mission) && mission.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-white/80 font-medium leading-relaxed">
                                                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Stats Counter */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative overflow-hidden border border-[#d4bc82] shadow-2xl"
                            style={{
                                background: "radial-gradient(circle at center, #ffffff 0%, #f7f0df 40%, #ebdcb2 100%)"
                            }}
                        >
                            <div className="grid grid-cols-2 relative z-10">
                                {stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="relative flex flex-col items-center justify-center text-center p-8 border-gold-primary/40 border-b odd:border-r [&:nth-child(3)]:border-b-0 last:border-b-0"
                                    >
                                        <div className="overflow-hidden mb-2">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                                className="text-5xl font-serif font-medium text-[#c5a044] leading-none tracking-tight flex items-baseline pb-2"
                                            >
                                                <Counter value={parseInt(stat.value)} delay={i * 0.1 + 0.5} />
                                                <span className="text-3xl ml-0.5">
                                                    {stat.value.includes('+') && '+'}
                                                    {stat.value.includes('%') && '%'}
                                                </span>
                                            </motion.div>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: i * 0.1 + 0.6 }}
                                            className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#7a7468] leading-tight max-w-[120px] mt-1"
                                        >
                                            {stat.label}
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Link */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <a
                                href="#contact"
                                className="group relative inline-flex overflow-hidden px-12 py-5 bg-gold-primary/90 border-2 border-gold-primary transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-[#c5a044] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <div className="relative flex items-center gap-4 z-10">
                                    <span className="text-[11px] uppercase tracking-[0.4em] font-bold group-hover:text-[#1a1a1a] transition-colors duration-500">
                                        {t('about.learn_more')}
                                    </span>
                                    <ArrowRight className="w-4 h-4 group-hover:text-[#1a1a1a] group-hover:translate-x-2 transition-all duration-500" />
                                </div>
                            </a>
                        </motion.div>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className="lg:col-span-7 flex flex-col gap-8 lg:pt-20">

                        {/* Description */}
                        <div className="space-y-6">
                            {Array.isArray(description) && description.map((paragraph, idx) => (
                                <p key={idx} className="text-gray-900 font-medium leading-relaxed text-lg">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Brand Trust Section */}
                        <div className="relative w-full overflow-hidden rounded-2xl border-2 border-gold-primary bg-radial-[at_center] from-navy-secondary to-navy-primary px-6 md:px-12">

                            {/* Animated net */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <pattern id="diamond-net" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                                        <path
                                            d="M18 0 L36 18 L18 36 L0 18 Z"
                                            fill="none"
                                            stroke="var(--color-gold-primary)"
                                            strokeWidth="0.8"
                                        />
                                    </pattern>
                                    <linearGradient id="fade-mask" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                                        <stop offset="40%" stopColor="white" stopOpacity="0" />
                                        <stop offset="60%" stopColor="white" stopOpacity="0" />
                                        <stop offset="100%" stopColor="white" stopOpacity="1" />
                                    </linearGradient>
                                    <mask id="net-mask">
                                        <rect width="100%" height="100%" fill="url(#fade-mask)" />
                                    </mask>
                                </defs>
                                <motion.rect
                                    width="100%" height="100%"
                                    fill="url(#diamond-net)"
                                    mask="url(#net-mask)"
                                    animate={{ x: [0, 36] }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                />
                                <motion.rect
                                    width="30%" height="100%"
                                    fill="url(#diamond-net)"
                                    opacity={0.15}
                                    animate={{ x: ["-30%", "130%"] }}
                                    transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
                                />
                            </svg>

                            <div className="relative z-10 flex flex-row items-center justify-between">
                                {/* Globe */}
                                <div className="flex-shrink-0 w-24 h-24 md:w-36 md:h-36 md:mx-10">
                                    <DotLottieReact
                                        src="/assets/globe.lottie"
                                        loop
                                        autoplay
                                        className="w-full h-full"
                                    />
                                </div>

                                {/* Slogan */}
                                <div className="flex flex-col items-start gap-2 flex-1 md:mx-10">
                                    <p className="font-cormorant font-bold italic text-xl md:text-4xl text-gold-secondary leading-snug">
                                        "{t('about.brand.slogan')}"
                                    </p>
                                </div>

                                {/* ISO Badge */}
                                <img
                                    src={iso9001}
                                    alt="ISO 9001 Certified"
                                    draggable="false"
                                    className="w-20 h-auto md:w-28 object-contain pointer-events-none select-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}