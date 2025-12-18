"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  const t = useTranslations("pricing");

  const tiers = [
    {
      key: "free",
      gradient: "from-slate-700/40 to-slate-800/40",
      accentColor: "text-silver",
      borderColor: "border-silver/30",
      hoverBorder: "hover:border-silver",
      featureCount: 4,
    },
    {
      key: "pro",
      gradient: "from-frost-blue/10 to-ice-blue/10",
      accentColor: "text-frost-blue",
      borderColor: "border-frost-blue/40",
      hoverBorder: "hover:border-frost-blue",
      popular: true,
      featureCount: 7,
    },
    {
      key: "enterprise",
      gradient: "from-crystal-blue/10 to-frost-blue/10",
      accentColor: "text-crystal-blue",
      borderColor: "border-crystal-blue/30",
      hoverBorder: "hover:border-crystal-blue",
      featureCount: 7,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-arctic via-frozen-slate/20 to-deep-arctic"></div>
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-frost-blue/5 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-ice-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '-3s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-frost-blue/20 to-ice-blue/20 px-6 py-2 rounded-full border border-frost-blue/30 mb-6">
            <Sparkles className="w-4 h-4 text-frost-blue" />
            <span className="text-sm font-medium text-frost-blue uppercase tracking-wider">Limited Time Offer</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300 }}
              className="relative"
            >
              <Card
                className={`group relative p-8 rounded-2xl cursor-pointer transition-all duration-500 ${tier.popular ? "transform scale-105 md:scale-110" : ""
                  } bg-gradient-to-br ${tier.gradient} backdrop-blur-xl border-2 ${tier.borderColor} ${tier.hoverBorder} hover:shadow-2xl overflow-hidden`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-frost-blue to-ice-blue text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg border border-white/20">
                      {t(`${tier.key}.badge`)}
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${tier.gradient} border ${tier.borderColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-4xl">{t(`${tier.key}.emoji`)}</span>
                    </div>
                    <h3 className={`text-2xl font-orbitron font-bold ${tier.accentColor} mb-2`}>
                      {t(`${tier.key}.name`)}
                    </h3>
                    <div className="text-4xl font-bold text-white mb-2">
                      {t(`${tier.key}.price`)}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {t(`${tier.key}.description`)}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {Array.from({ length: tier.featureCount }).map((_, i) => (
                      <li key={i} className="flex items-start text-slate-300">
                        <Check className={`${tier.accentColor} mr-3 h-5 w-5 flex-shrink-0 mt-0.5`} />
                        <span className="text-sm">{t(`${tier.key}.features.${i}`)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href="https://flow.frostylabs.ai" target="_blank" className="w-full">
                    <Button
                      className={`w-full ${tier.key === "pro"
                          ? "bg-gradient-to-r from-frost-blue to-crystal-blue hover:from-ice-blue hover:to-frost-blue text-white border-none shadow-lg shadow-frost-blue/20"
                          : "bg-white/5 hover:bg-white/10 text-white border border-white/20"
                        } py-6 px-6 rounded-xl font-semibold transition-all duration-300 group-hover:scale-105`}
                    >
                      {t(`${tier.key}.cta`)}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

