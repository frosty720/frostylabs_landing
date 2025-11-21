"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Server, Eye } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function SecurityTrustBadge() {
    const t = useTranslations("security");

    const securityFeatures = [
        {
            icon: Shield,
            title: t('features.bankGrade.title'),
            description: t('features.bankGrade.description'),
            color: "frost-blue",
        },
        {
            icon: Lock,
            title: t('features.nonCustodial.title'),
            description: t('features.nonCustodial.description'),
            color: "ice-blue",
        },
        {
            icon: Server,
            title: t('features.infrastructure.title'),
            description: t('features.infrastructure.description'),
            color: "crystal-blue",
        },
        {
            icon: Eye,
            title: t('features.privacy.title'),
            description: t('features.privacy.description'),
            color: "frost-blue",
        },
    ];

    return (
        <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-deep-arctic via-frozen-slate/10 to-deep-arctic">
            {/* Ice crystal ambient effects */}
            <div className="absolute inset-0 ice-crystal opacity-10"></div>
            <div className="absolute top-20 right-20 w-96 h-96 bg-frost-blue/5 rounded-full blur-3xl float-animation"></div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-frost-blue/20 to-ice-blue/20 border border-frost-blue/30 rounded-full mb-6">
                        <Shield className="w-4 h-4 text-frost-blue" />
                        <span className="text-frost-blue font-semibold text-sm">{t('badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
                        <span className="gradient-text">{t('title')}</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        {t('descriptionPrefix')} <span className="text-frost-blue font-semibold">{t('descriptionHighlight')}</span>{t('descriptionSuffix')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {securityFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8, scale: 1.03 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300 }}
                            className="group relative frosted-glass rounded-xl p-6 border-2 border-frost-blue/20 hover:border-frost-blue/50 transition-all duration-300 overflow-hidden"
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className={`w-14 h-14 bg-gradient-to-br from-${feature.color}/20 to-ice-blue/20 border border-${feature.color}/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-frost-blue transition-colors">{feature.title}</h3>
                                <p className="text-slate-400 text-sm">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <Link
                        href="/features#security"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-frost-blue/20 to-ice-blue/20 border-2 border-frost-blue/30 hover:border-frost-blue rounded-xl hover:shadow-frost-blue/30 hover:shadow-2xl transition-all duration-300 group"
                    >
                        <span className="font-bold text-white">{t('cta')}</span>
                        <svg className="w-5 h-5 text-frost-blue group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
