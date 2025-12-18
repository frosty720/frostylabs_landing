"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative pt-32 pb-24 overflow-hidden hero-gradient-bg">
      <div className="absolute insert-0 bg-gradient-radial from-transparent via-frozen-slate/20 to-frozen-slate/40"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-orbitron font-bold mb-8 leading-tight"
          >
            <span className="gradient-text">{t("title")}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-orbitron font-semibold mb-6 text-white"
          >
            {t("subtitle")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-frost-blue/20 text-frost-blue px-8 py-3 rounded-full font-semibold mb-10 text-lg border border-frost-blue/30"
          >
            {t("launchBadge")}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            {t("description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link href="https://flow.frostylabs.ai" target="_blank">
              <Button
                className="bg-gradient-to-r from-frost-blue to-crystal-blue hover:from-ice-blue hover:to-frost-blue px-10 py-7 rounded-xl font-semibold text-xl transition-all transform hover:scale-105 pulse-glow flex items-center gap-3"
              >
                {t("launchApp")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="https://github.com/FrostyLabsAi" target="_blank">
              <Button
                variant="outline"
                className="bg-transparent border-2 border-frost-blue/50 hover:bg-frost-blue/10 text-white px-8 py-7 rounded-xl font-semibold text-xl transition-all flex items-center gap-3"
              >
                <Github className="w-5 h-5" />
                {t("viewGithub")}
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-slate-400"
          >
            {t("nftSubscription")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

