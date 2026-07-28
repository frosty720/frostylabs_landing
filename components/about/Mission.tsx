"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const goals = [{ icon: "🎯" }, { icon: "🔒" }, { icon: "🌐" }];

export function Mission() {
	const t = useTranslations("aboutPage.mission");

	return (
		<section id="mission" className="relative overflow-hidden px-6 py-28">
			<div className="mx-auto max-w-6xl">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl">
							<span className="aurora-text">{t("title")}</span>
						</h2>
						<p className="mb-6 text-lg leading-relaxed text-[#aab2c5]">
							{t("paragraph1")}
						</p>
						<p className="mb-8 text-lg leading-relaxed text-[#aab2c5]">
							{t("paragraph2")}
						</p>

						<div className="space-y-4">
							{goals.map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									whileHover={{ x: 5 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300 }}
									className="group frosted-glass flex items-center gap-4 rounded-xl border border-white/10 p-4 transition-colors duration-300 hover:border-white/20"
								>
									<div className="text-2xl transition-transform group-hover:scale-110">{item.icon}</div>
									<span className="text-[#aab2c5] transition-colors group-hover:text-white">{t(`goals.${index}`)}</span>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="frosted-glass rounded-2xl border border-white/10 p-8"
					>
						<h3 className="mb-6 text-center text-2xl font-semibold text-[#67e8f9]">{t("vision.title")}</h3>
						<motion.div
							whileHover={{ scale: 1.03 }}
							className="mb-6 flex h-48 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-transform duration-300"
						>
							<span className="text-6xl">🚀</span>
						</motion.div>
						<p className="text-center leading-relaxed text-[#aab2c5]">
							{t("vision.description")}
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
