"use client";

import { motion } from "framer-motion";
import { Calendar, Rocket, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function LaunchTimeline() {
    const t = useTranslations("timeline");

    const milestones = [
        {
            quarter: "Q4 2025",
            title: t('milestones.beta.title'),
            icon: Rocket,
            status: t('status.inProgress'),
            color: "frost-blue",
            items: [
                t('milestones.beta.items.0'),
                t('milestones.beta.items.1'),
                t('milestones.beta.items.2')
            ],
        },
        {
            quarter: "Q1 2026",
            title: t('milestones.launch.title'),
            icon: Zap,
            status: t('status.planned'),
            color: "ice-blue",
            items: [
                t('milestones.launch.items.0'),
                t('milestones.launch.items.1'),
                t('milestones.launch.items.2')
            ],
        },
    ];

    return (
        <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-deep-arctic via-frozen-slate/20 to-deep-arctic">
            {/* Ice crystal ambient effects */}
            <div className="absolute inset-0 ice-crystal opacity-15"></div>
            <div className="absolute top-20 left-20 w-96 h-96 bg-frost-blue/5 rounded-full blur-3xl float-animation"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-ice-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '-4s' }}></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-frost-blue/20 to-ice-blue/20 border border-frost-blue/30 rounded-full mb-6">
                        <Calendar className="w-4 h-4 text-frost-blue" />
                        <span className="text-frost-blue font-semibold text-sm">{t('badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
                        <span className="gradient-text">{t('title')}</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        {t('descriptionPrefix')} <span className="text-frost-blue font-bold">{t('descriptionHighlight')}</span>
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 300 }}
                            className={`group relative frosted-glass rounded-2xl p-8 border-2 border-${milestone.color}/30 hover:border-${milestone.color} transition-all duration-500 overflow-hidden`}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 bg-gradient-to-br from-${milestone.color}/20 to-ice-blue/20 border border-${milestone.color}/30 rounded-lg flex items-center justify-center`}>
                                            <milestone.icon className={`w-6 h-6 text-${milestone.color}`} />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-orbitron font-bold text-${milestone.color}`}>{milestone.quarter}</h3>
                                            <p className="text-sm text-slate-400">{milestone.status}</p>
                                        </div>
                                    </div>
                                    <span className={`bg-gradient-to-r from-${milestone.color} to-ice-blue text-white px-3 py-1 rounded-full text-xs font-bold`}>
                                        {milestone.status}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-4 group-hover:text-frost-blue transition-colors">{milestone.title}</h4>
                                <ul className="space-y-2">
                                    {milestone.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-2 text-slate-300">
                                            <span className={`text-${milestone.color} mt-1`}>•</span>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative frosted-glass rounded-2xl p-8 border-2 border-frost-blue/30 text-center overflow-hidden"
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer opacity-30 pointer-events-none"></div>

                    <div className="relative z-10">
                        <p className="text-lg text-slate-300 mb-6">
                            <span className="text-frost-blue font-bold text-2xl">{t('betaDate')}</span> - {t('betaDescription')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/about#roadmap"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-frost-blue/20 to-ice-blue/20 border border-frost-blue/30 hover:border-frost-blue rounded-lg transition-all duration-300"
                            >
                                <span className="font-semibold text-white">{t('viewRoadmap')}</span>
                                <svg className="w-4 h-4 text-frost-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
