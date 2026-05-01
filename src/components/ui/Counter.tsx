import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { motion } from 'framer-motion';

export default function Counter({ value, delay }: { value: number; delay: number }) {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));

	useEffect(() => {
		const controls = animate(count, value, {
			duration: 2,
			delay: delay,
			ease: [0.16, 1, 0.3, 1],
		});
		return controls.stop;
	}, [count, value, delay]);

	return <motion.span>{rounded}</motion.span>;
}