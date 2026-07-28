"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const stats = [
	{ icon: "🤖", value: "20+", labelKey: "aiModels" },
	{ icon: "⛓️", value: "35+", labelKey: "blockchainNetworks" },
	{ icon: "🚀", value: "TBA", labelKey: "launchDate" },
];

export function AboutHero() {
	const t = useTranslations("aboutPage.hero");

	return (
		<section className="aurora-bg relative overflow-hidden px-6 pt-32 pb-24">
			<div className="grid-overlay pointer-events-none absolute inset-0" />

			<div className="relative z-10 mx-auto max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mb-6 inline-block"
					>
						<span className="mono-label inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[#67e8f9]">
							{t("badge")}
						</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="mb-6 text-5xl font-semibold tracking-tight md:text-7xl"
					>
						{t("title")}
						<br />
						<span className="aurora-text">{t("titleGradient")}</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="mx-auto mb-12 max-w-3xl text-lg text-[#aab2c5] md:text-xl"
					>
						{t("description")}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="flex flex-wrap justify-center gap-6"
					>
						{stats.map((stat) => (
							<motion.div
								key={stat.labelKey}
								whileHover={{ y: -6 }}
								transition={{ type: "spring", stiffness: 300 }}
								className="frosted-glass min-w-[200px] rounded-2xl border border-white/10 p-6 transition-colors duration-300 hover:border-white/20"
							>
								<div className="mb-2 text-3xl">{stat.icon}</div>
								<div className="mb-1 text-3xl font-semibold">
									<span className="aurora-text">{stat.value}</span>
								</div>
								<div className="text-sm text-[#aab2c5]">{t(`stats.${stat.labelKey}`)}</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
