import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next'; // ← tambah Trans
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker
} from "react-simple-maps";

const geoDataSource = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers: { name: string; coordinates: [number, number] }[] = [
	// Indonesia
	{ name: "Medan", coordinates: [98.6722, 3.5952] },
	{ name: "Riau", coordinates: [101.4478, 0.5071] },
	{ name: "Lampung", coordinates: [105.2668, -5.4500] },
	{ name: "Banjarmasin", coordinates: [114.5908, -3.3194] },
	{ name: "Kendari", coordinates: [122.5186, -3.9985] },
	{ name: "Jepara", coordinates: [110.6688, -6.5883] },
	// Asia Tenggara
	{ name: "Shah Alam", coordinates: [101.5329, 3.0738] },
	{ name: "Bangkok", coordinates: [100.5018, 13.7563] },
	{ name: "Binh Duong", coordinates: [106.6297, 11.0686] },
	// China
	{ name: "Guilin", coordinates: [110.2990, 25.2740] },
	{ name: "Gaoqiao", coordinates: [121.6500, 31.3800] },
	{ name: "Guangzhou", coordinates: [113.2644, 23.1291] },
	{ name: "Zhengzhou", coordinates: [113.6254, 34.7466] },
	{ name: "Guiyang", coordinates: [106.6302, 26.6477] },
	// Asia Timur
	{ name: "Nagoya", coordinates: [136.9066, 35.1815] },
	// Eropa
	{ name: "Hamburg", coordinates: [9.9937, 53.5753] },
	{ name: "Moskow", coordinates: [37.6173, 55.7558] },
	{ name: "Belgorod", coordinates: [36.5983, 50.5997] },
];

export default function Market() {
	const { t } = useTranslation();
	const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

	// Ambil jumlah item description untuk di-loop Trans
	const markets = t('market.description', { returnObjects: true }) as string[];

	return (
		<section id="market" className="bg-white relative overflow-hidden scroll-mt-32">
			<div className="container mx-auto px-6 relative z-10">

				{/* Header */}
				<div className="max-w-4xl mb-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<div className="flex items-center gap-4 mb-6">
							<div className="w-12 h-[2px] bg-gold-primary" />
							<span className="text-gold-primary font-bold tracking-[0.3em] text-xs uppercase">
								{t('market.badge')}
							</span>
						</div>

						{/* ✅ Trans component — support <highlight> di JSON */}
						<div className="border-l-4 border-gold-primary pl-6 flex flex-col gap-4">
							{markets.map((_, index) => (
								<p key={index} className="text-slate-600 text-lg leading-relaxed">
									<Trans
										i18nKey={`market.description.${index}`}
										components={{
											highlight: <span className="text-black font-bold" />,
										}}
									/>
								</p>
							))}
						</div>

					</motion.div>
				</div>

				{/* Map Container */}
				<div className="w-full bg-[#f8fafc] rounded-[2rem] border border-slate-100 overflow-hidden relative shadow-inner">
					<ComposableMap
						projection="geoMercator"
						width={960}
						height={580}
						projectionConfig={{ scale: 147, center: [0, 20] }}
						style={{ width: "100%", height: "auto", display: "block" }}
					>
						<Geographies geography={geoDataSource}>
							{({ geographies }) =>
								geographies.map((geo) => (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										fill="#1a1a1a"
										stroke="#F5F0E8"
										strokeWidth={0.5}
										style={{
											default: { outline: "none" },
											hover: { outline: "none" },
											pressed: { outline: "none" },
										}}
									/>
								))
							}
						</Geographies>

						{markers.map(({ name, coordinates }) => (
							<Marker
								key={name}
								coordinates={coordinates}
								onMouseEnter={() => setHoveredMarker(name)}
								onMouseLeave={() => setHoveredMarker(null)}
							>
								<circle
									r={hoveredMarker === name ? 12 : 8}
									fill="#d4af37"
									fillOpacity={hoveredMarker === name ? 0.4 : 0.2}
									stroke="#d4af37"
									strokeWidth={1}
									style={{ cursor: "pointer", transition: "fill-opacity 0.3s ease" }}
								/>
								<circle
									r={3.5}
									fill="#d4af37"
									stroke="#ffffff"
									strokeWidth={0.8}
									style={{ cursor: "pointer" }}
								/>
							</Marker>
						))}

						{markers.map(({ name, coordinates }) =>
							hoveredMarker === name ? (
								<Marker key={`tooltip-${name}`} coordinates={coordinates}>
									<motion.g
										initial={{ opacity: 0, y: 4 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 4 }}
										transition={{ duration: 0.15 }}
									>
										<rect
											x={-(name.length * 2.8 + 6)}
											y={-34}
											width={name.length * 5.6 + 12}
											height={16}
											rx={4}
											fill="#d4af37"
										/>
										<polygon points="0,-18 -4,-18 0,-14 4,-18" fill="#d4af37" />
										<text
											textAnchor="middle"
											y={-22}
											style={{
												fontSize: "7px",
												pointerEvents: "none",
												userSelect: "none",
												textTransform: "uppercase",
											}}
										>
											{name}
										</text>
									</motion.g>
								</Marker>
							) : null
						)}
					</ComposableMap>
				</div>

			</div>
		</section>
	);
}