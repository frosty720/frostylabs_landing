"use client";

import { motion } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Script from "next/script";

export function FAQ() {
    const t = useTranslations("faq");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // FAQ items - update this count when adding/removing questions
    const FAQ_COUNT = 12;
    const faqItems = Array.from({ length: FAQ_COUNT }, (_, index) => ({
        question: t(`items.${index}.question`),
        answer: t(`items.${index}.answer`),
    }));

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate FAQ Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <>
            {/* FAQ Schema for SEO */}
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="relative py-24 overflow-hidden bg-gradient-to-b from-deep-arctic via-frozen-slate/30 to-deep-arctic">
                {/* Ambient effects */}
                <div className="absolute inset-0 ice-crystal"></div>
                <div className="absolute top-20 right-20 w-96 h-96 bg-frost-blue/10 rounded-full blur-3xl float-animation"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-ice-blue/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '-2s' }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-frost-blue/20 to-ice-blue/20 px-6 py-2 rounded-full border border-frost-blue/30 mb-6"
                        >
                            <HelpCircle className="w-4 h-4 text-frost-blue" />
                            <span className="text-sm font-medium text-frost-blue">FAQ</span>
                        </motion.div>

                        <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
                            <span className="gradient-text">{t('title')}</span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="mb-4"
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full text-left frosted-glass border border-frost-blue/20 rounded-xl p-6 hover:border-frost-blue/40 transition-all duration-300 group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-frost-blue transition-colors pr-8">
                                            {item.question}
                                        </h3>
                                        <div className="flex-shrink-0 mt-1">
                                            {openIndex === index ? (
                                                <Minus className="w-5 h-5 text-frost-blue" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-slate-400 group-hover:text-frost-blue transition-colors" />
                                            )}
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: openIndex === index ? "auto" : 0,
                                            opacity: openIndex === index ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-slate-300 mt-4 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </motion.div>
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA below FAQ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mt-16"
                    >
                        <p className="text-slate-300 mb-6">
                            Still have questions?
                        </p>
                        <a
                            href="https://twitter.com/FrostyLabsAI"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-frost-blue to-crystal-blue text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-frost-blue/50 transition-all duration-300 hover:scale-105"
                        >
                            Ask Us on Twitter →
                        </a>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
