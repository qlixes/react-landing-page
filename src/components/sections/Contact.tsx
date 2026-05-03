import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { MapPin, Handshake, Mail, Clock, Send, Loader2 } from 'lucide-react';
import {
	IconBrandTiktok,
	IconBrandInstagram,
	IconBrandFacebook,
	IconBrandLinkedin,
	IconBrandWhatsapp
} from '@tabler/icons-react';

export default function Contact() {
	const { t } = useTranslation();

	// State untuk manajemen form dan status pengiriman
	const [form, setForm] = useState<Record<string, string>>({
		name: '', company: '', email: '', country: '', message: ''
	});
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

	// Data dari locales
	const address = t('contact.address', { returnObjects: true }) as string[];
	const phone = t('contact.phone', { returnObjects: true }) as string[];
	const mail = t('contact.mail', { returnObjects: true }) as string[];
	const schedule = t('contact.schedule', { returnObjects: true }) as string[];
	const title = t('contact.title', { returnObjects: true }) as string[];
	const description = t('contact.description', { returnObjects: true }) as string[];
	const mission = t('contact.mission', { returnObjects: true }) as string[];
	const formFields = t('contact.form', { returnObjects: true }) as any[];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Logika pengiriman email via Netlify Functions
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('loading');

		try {
			const response = await fetch('/.netlify/functions/inquiry', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			if (response.ok) {
				setStatus('success');
				setForm({ name: '', company: '', email: '', country: '', message: '' }); // Reset form
				setTimeout(() => setStatus('idle'), 5000); // Reset status setelah 5 detik
			} else {
				setStatus('error');
			}
		} catch (error) {
			console.error('Submission error:', error);
			setStatus('error');
		}
	};

	const contactInfo = [
		{ icon: MapPin, lines: address },
		{ icon: IconBrandWhatsapp, lines: phone },
		{ icon: Mail, lines: mail, isEmail: true },
		{ icon: Clock, lines: schedule },
	];

	const inputClass = `
        w-full bg-white/5 border border-white/10 text-white text-sm
        px-4 py-3 outline-none placeholder:text-white/30
        focus:border-gold-primary/60 focus:bg-white/8
        transition-all duration-200 disabled:opacity-50
    `;

	const labelClass = "text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary mb-1.5 flex items-center gap-2";

	return (
		<section id="contact" className="bg-navy-gradient scroll-mt-20 py-24">
			<div className="container mx-auto px-6">
				{/* Header Section tetap sama */}
				<div className="mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<span className="text-gold-primary text-[10px] font-bold uppercase tracking-[0.4em]">
							{t('contact.slogan')}
						</span>
						<div className="font-cormorant text-5xl md:text-7xl text-white font-bold leading-[1.05] mt-4">
							{title.map((_, index) => (
								<p key={index} className="leading-relaxed">
									<Trans
										i18nKey={`contact.title.${index}`}
										components={{
											highlight: <span className="italic text-gold-primary" />,
										}}
									/>
								</p>
							))}
						</div>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
					{/* Left Info Column tetap sama */}
					<motion.div className="flex flex-col gap-10">
						<div>
							{description.map((_, index) => (
								<p key={index} className="text-white/70 text-base leading-relaxed mb-4">
									<Trans
										i18nKey={`contact.description.${index}`}
										components={{
											highlight: <span className="text-white font-semibold" />,
										}}
									/>
								</p>
							))}
						</div>
						<div className="flex flex-col gap-2">
							{mission.map((item, index) => (
								<p key={index} className="text-gold-primary font-bold text-sm tracking-wide flex items-center gap-3">
									<Handshake className="shrink-0 w-5 h-5 opacity-80" strokeWidth={1.5} />
									<span>{item}</span>
								</p>
							))}
						</div>
						<div className="flex flex-col gap-6">
							{contactInfo.map((info, i) => (
								<div key={i} className="flex items-start gap-4">
									<div className="shrink-0 w-8 h-8 rounded-full border border-gold-primary/30 flex items-center justify-center mt-0.5">
										<info.icon className="w-3.5 h-3.5 text-gold-primary" />
									</div>
									<div className="flex flex-col gap-0.5">
										{info.lines.map((line, j) => (
											info.isEmail ? (
												<a key={j} href={`mailto:${line}`} className="text-white/60 text-sm hover:text-gold-primary transition-colors">{line}</a>
											) : (
												<span key={j} className="text-white/60 text-sm leading-relaxed">{line}</span>
											)
										))}
									</div>
								</div>
							))}
						</div>
					</motion.div>

					{/* Right — Updated Contact Form */}
					<motion.div>
						<form onSubmit={handleSubmit} className="flex flex-col gap-5">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								{formFields.slice(0, 4).map((field: any) => (
									<div key={field.key}>
										<label className={labelClass}>
											{field.label} {field.required && <span className="text-red-400">*</span>}
										</label>
										<input
											type={field.type}
											name={field.key}
											required={field.required}
											disabled={status === 'loading'}
											placeholder={field.label}
											value={form[field.key] || ''}
											onChange={handleChange}
											className={inputClass}
										/>
									</div>
								))}
							</div>

							{formFields.filter((f: any) => f.type === 'textarea').map((field: any) => (
								<div key={field.key}>
									<label className={labelClass}>{field.label}</label>
									<textarea
										name={field.key}
										required={field.required}
										disabled={status === 'loading'}
										placeholder={field.label}
										rows={5}
										value={form[field.key] || ''}
										onChange={handleChange}
										className={`${inputClass} resize-none`}
									/>
								</div>
							))}

							<div className="flex flex-col gap-4">
								<button
									type="submit"
									disabled={status === 'loading'}
									className="group relative overflow-hidden border border-gold-primary px-8 py-4 w-full md:w-auto flex items-center justify-center gap-3 transition-all duration-300 hover:bg-gold-primary disabled:border-white/20 disabled:hover:bg-transparent"
								>
									<div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
									<span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-gold-primary group-hover:text-navy-primary transition-colors">
										{status === 'loading' ? t('contact.button.sending') || 'Sending...' : t('contact.button.submit') || 'Send Message'}
									</span>
									{status === 'loading' ? (
										<Loader2 className="relative z-10 w-3.5 h-3.5 animate-spin text-gold-primary" />
									) : (
										<Send className="relative z-10 w-3.5 h-3.5 text-gold-primary group-hover:text-navy-primary group-hover:translate-x-1 transition-all" />
									)}
								</button>

								{/* Feedback Messages */}
								{status === 'success' && (
									<p className="text-green-400 text-xs font-medium">Message sent successfully! We will contact you soon.</p>
								)}
								{status === 'error' && (
									<p className="text-red-400 text-xs font-medium">Failed to send message. Please try again later.</p>
								)}
							</div>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
}