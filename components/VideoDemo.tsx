"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

export function VideoDemo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const t = useTranslations("videoDemo");

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-deep-arctic via-frozen-slate/50 to-deep-arctic">
            {/* Ice crystal ambient effects */}
            <div className="absolute inset-0 ice-crystal"></div>
            <div className="absolute top-20 left-20 w-96 h-96 bg-frost-blue/10 rounded-full blur-3xl float-animation"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-ice-blue/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '-3s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-frost-blue/20 to-ice-blue/20 px-6 py-2 rounded-full border border-frost-blue/30 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-frost-blue" />
                        <span className="text-sm font-medium text-frost-blue">Watch It In Action</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
                        <span className="gradient-text">{t('title')}</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        See how FrostyLabs automatically fetches on-chain data, security audits, and price analysis—
                        <span className="text-frost-blue font-semibold"> all in one click</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-frost-blue/30 frosted-glass">
                        {/* Shimmer effect on border */}
                        <div className="absolute inset-0 shimmer pointer-events-none z-10"></div>

                        {/* Multi-layer glow */}
                        <div className="absolute -inset-1 bg-gradient-to-tr from-frost-blue/30 via-transparent to-ice-blue/30 blur-xl pointer-events-none"></div>

                        <div className="relative aspect-video">
                            <video
                                className="w-full h-full object-cover bg-deep-arctic"
                                src="/recordings/short.mp4"
                                controls
                                muted
                                playsInline
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setIsPlaying(false)}
                            >
                                Your browser does not support the video tag.
                            </video>

                            {/* Play button overlay (only shown when not playing) */}
                            {!isPlaying && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-deep-arctic/60 via-frozen-slate/40 to-deep-arctic/60 backdrop-blur-[2px] cursor-pointer"
                                    onClick={(e) => {
                                        const video = e.currentTarget.parentElement?.querySelector('video');
                                        video?.play();
                                    }}
                                >
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative"
                                    >
                                        {/* Pulsing glow rings */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-frost-blue to-ice-blue opacity-50 blur-xl pulse-glow"></div>

                                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-frost-blue to-crystal-blue flex items-center justify-center shadow-lg border border-white/20">
                                            <Play className="w-10 h-10 text-white ml-1" fill="white" />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>

                        {/* Bottom gradient bar with ice theme */}
                        <div className="h-2 bg-gradient-to-r from-frost-blue via-ice-blue to-crystal-blue"></div>
                    </div>

                    {/* Enhanced caption with benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 text-center space-y-2"
                    >
                        <p className="text-slate-300 text-base">
                            Real workflow execution analyzing <span className="text-frost-blue font-semibold">token data in parallel</span>
                        </p>
                        <p className="text-slate-400 text-sm">
                            ⚡ Fetches price, liquidity, security audits, and news—all at once
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
