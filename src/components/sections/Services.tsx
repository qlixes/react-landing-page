import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
	Settings,
	Factory,
	Cpu,
	Wrench,
	ShieldCheck,
	Lightbulb,
	ArrowUpRight
} from 'lucide-react';
import iso9001 from '@/assets/iso9001.jpg';

export default function Services() {
	const { t } = useTranslation();

	const iconMap: { [key: string]: React.ReactNode } = {
		machine_design: <Settings className="w-7 h-7" />,
		manufacturing: <Factory className="w-7 h-7" />,
		factory_line: <Cpu className="w-7 h-7" />,
		installation: <Wrench className="w-7 h-7" />,
		after_sales: <ShieldCheck className="w-7 h-7" />,
		consultation: <Lightbulb className="w-7 h-7" />,
	};

	const services = t('service.lists', { returnObjects: true }) as any[];

	return (
		<section id="service" className="py-32 relative overflow-hidden scroll-mt">
			{/* Background Decor */}
			<div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
				<div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[120px]" />
				<div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
			</div>

			<div className="container mx-auto px-6">
				<div className="flex flex-col lg:flex-row gap-16">

					{/* LEFT SIDE: Sticky Header & Trust Badge */}
					<div className="lg:w-1/3 lg:sticky h-fit">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							className="flex flex-col items-start"
						>
							<div className="flex items-center gap-4 mb-8">
								<div className="w-16 h-[2px] bg-gold-primary" />
								<span className="text-gold-primary font-bold tracking-[0.4em] text-xs uppercase">
									{t('service.badge')}
								</span>
							</div>

							<h2 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tighter mb-10 text-left">
								{t('service.title')}
								<br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-secondary">
									{t('service.subtitle')}
								</span>
							</h2>

							<motion.div
								whileHover={{ scale: 1.02 }}
								className="relative w-full max-w-[280px] group"
							>
								<div className="absolute -inset-2 border border-gold-primary/20 rounded-xl group-hover:border-gold-primary/50 transition-colors duration-500" />
								<div className="relative overflow-hidden rounded-lg border-2 border-gold-primary bg-slate-900/50 backdrop-blur-md shadow-2xl">
									<img
										src={iso9001}
										alt="ISO 9001 Certified"
										className="w-full h-auto object-contain p-2"
									/>
								</div>
							</motion.div>
						</motion.div>
					</div>

					{/* RIGHT SIDE: Interactive Cards Stack */}
					<div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
						{services.map((service, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1, duration: 0.6 }}
								whileHover={{ y: -8 }}
								className="group relative bg-navy-primary border-4 border-gold-primary p-8 rounded-[2.5rem] hover:border-gold-primary transition-all duration-500 overflow-hidden"
							>
								<div className="absolute -top-2 -right-2 text-8xl font-black text-white/[0.02] group-hover:text-gold-primary/[0.04] transition-colors pointer-events-none italic">
									{idx + 1}
								</div>

								<div className="relative z-10">
									{/* FIX: Mengubah bg-gradient saat hover menggunakan from/to transparan */}
									<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-gold-primary mb-8 transition-all duration-500 shadow-xl border border-white/5 group-hover:scale-110 group-hover:from-gold-primary group-hover:to-gold-primary group-hover:text-slate-950">
										{iconMap[service.key]}
									</div>

									<h3 className="text-xl font-bold text-white mb-4 transition-colors flex items-center justify-between group-hover:text-gold-primary">
										{service.title}
										<ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
									</h3>

									<p className="text-slate-400 text-sm leading-relaxed mb-8 transition-colors group-hover:text-slate-300">
										{service.description}
									</p>

									{/* Progressive Indicator */}
									<div className="flex gap-1.5 items-center">
										{/* FIX: Konsistensi transisi indikator bar */}
										<div className="h-1 w-10 bg-gold-primary/20 rounded-full transition-all duration-500 group-hover:w-20 group-hover:bg-gold-primary" />
										<div className="h-1 w-1.5 bg-gold-primary/40 rounded-full group-hover:bg-gold-primary" />
										<div className="h-1 w-1.5 bg-gold-primary/10 rounded-full group-hover:bg-gold-primary/30" />
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}