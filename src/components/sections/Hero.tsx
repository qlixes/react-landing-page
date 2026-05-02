import { useTranslation } from 'react-i18next';
import heroBg from '@/assets/hero.jpg';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
	const { t } = useTranslation();

	return (
		<section id="home" className="relative w-full h-screen mt-20 overflow-hidden bg-gray-900">

			{/* 1. Background Image */}
			<div className="absolute inset-0 z-0">
				<img src={heroBg} alt="Industrial Facility Sunsse" draggable="false" className="w-full h-full object-cover pointer-events-none select-none" loading="eager" fetchPriority="high" />
			</div>

			<div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_right,_var(--color-brand-gold)/25%,_transparent_60%)] mix-blend-soft-light" />

			<div className="absolute inset-0 z-10 bg-transparent backdrop-blur-[1px] pointer-events-none" />

			{/* 4. Content (Tetap sama seperti sebelumnya) */}
			<div className="container mx-auto px-4 h-full relative z-20 flex flex-col items-center justify-center text-center text-white text-bold">
				<h1 className="text-white text-5xl md:text-7xl font-bold leading-[1.1] mb-6 drop-shadow-2xl tracking-tight">
					{t('hero.title')}
				</h1>

				{/* Subtitle */}
				<div className="max-w-2xl text-white text-xl md:text-lg leading-relaxed text-center space-y-4 mb-10 font-bold">
					<p>{t('hero.subtitle')}</p>
					<p>{t('hero.description')}</p>
				</div>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					viewport={{ once: true }}
					className="flex flex-col sm:flex-row items-center justify-center gap-5"
				>
					{/* Button 1: Primary CTA */}
					<motion.a
						href="#service"
						whileHover={{
							scale: 1.05,
							boxShadow: "0px 10px 30px rgba(212, 175, 55, 0.4)"
						}}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 text-[10px] tracking-[0.2em] font-black border border-transparent uppercase transition-all duration-300 bg-gold-secondary text-black flex items-center gap-2 group"
					>
						{t('hero.cta.service')}
						<motion.span
							initial={{ x: 0 }}
							whileHover={{ x: 5 }}
							transition={{ type: "spring", stiffness: 400 }}
						>
							<ArrowRight className="w-3 h-3" />
						</motion.span>
					</motion.a>

					{/* Button 2: Secondary CTA (Outline Style agar lebih variatif) */}
					<motion.a
						href="#contact"
						whileHover={{
							scale: 1.05,
							boxShadow: "0px 10px 30px rgba(212, 175, 55, 0.4)"
						}}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 text-[10px] tracking-[0.2em] font-black border border-transparent uppercase transition-all duration-300 bg-gold-secondary text-black flex items-center gap-2 group"
					>
						{t('hero.cta.contact')}
						<motion.span
							initial={{ x: 0 }}
							whileHover={{ x: 5 }}
							transition={{ type: "spring", stiffness: 400 }}
						>
							<ArrowRight className="w-3 h-3" />
						</motion.span>
					</motion.a>

				</motion.div>
			</div>
		</section >
	);
}
