import { useTranslation } from 'react-i18next';
import heroBg from '@/assets/hero.jpg';

export default function Hero() {
	const { t } = useTranslation();

	return (
		<section id="home" className="relative w-full h-screen mt-20 overflow-hidden bg-gray-900">

			{/* 1. Background Image */}
			<div className="absolute inset-0 z-0">
				<img src={heroBg} alt="Industrial Facility Sunsse" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
			</div>

			<div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_right,_var(--color-brand-gold)/25%,_transparent_60%)] mix-blend-soft-light" />

			<div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />

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
				<div className="flex flex-col sm:flex-row items-center justify-center gap-5">
					<a href="#service" className="px-7 py-4 text-xs font-bold border border-transparent uppercase transition-all duration-300 bg-gold-secondary text-black hover:brightness-110 hover:shadow-lg hover:shadow-[var(--color-primary)]/40 active:scale-95">{t('hero.cta.service')}</a>
					<a href="#contact" className="px-7 py-4 text-xs font-bold uppercase transition-all duration-300 border border-white/40 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-black hover:border-white active:scale-95">{t('hero.cta.contact')}</a>
				</div>
			</div>
		</section >
	);
}
