"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MessageSquare, TrendingUp, FileText, Headphones, ShoppingCart, Edit } from "lucide-react";

export function UseCases() {
  const t = useTranslations("useCases");

  const useCases = [
    {
      badge: t("cards.socialMedia.badge"),
      badgeClass: "bg-frost-blue/20 text-frost-blue border border-frost-blue/30",
      borderClass: "border-frost-blue/30 hover:border-frost-blue",
      glowClass: "from-frost-blue/20 to-ice-blue/20",
      icon: MessageSquare,
      iconClass: "bg-gradient-to-br from-frost-blue/20 to-ice-blue/20 text-frost-blue border border-frost-blue/30",
      arrowClass: "text-frost-blue",
      benefitClass: "text-frost-blue",
      title: t("cards.socialMedia.title"),
      subtitle: t("cards.socialMedia.subtitle"),
      features: [
        t("cards.socialMedia.features.0"),
        t("cards.socialMedia.features.1"),
        t("cards.socialMedia.features.2"),
        t("cards.socialMedia.features.3"),
      ],
      benefit: t("cards.socialMedia.benefit"),
    },
    {
      badge: t("cards.defiTrading.badge"),
      badgeClass: "bg-ice-blue/20 text-ice-blue border border-ice-blue/30",
      borderClass: "border-ice-blue/30 hover:border-ice-blue",
      glowClass: "from-ice-blue/20 to-crystal-blue/20",
      icon: TrendingUp,
      iconClass: "bg-gradient-to-br from-ice-blue/20 to-crystal-blue/20 text-ice-blue border border-ice-blue/30",
      arrowClass: "text-ice-blue",
      benefitClass: "text-ice-blue",
      title: t("cards.defiTrading.title"),
      subtitle: t("cards.defiTrading.subtitle"),
      features: [
        t("cards.defiTrading.features.0"),
        t("cards.defiTrading.features.1"),
        t("cards.defiTrading.features.2"),
        t("cards.defiTrading.features.3"),
      ],
      benefit: t("cards.defiTrading.benefit"),
      subtext: t("cards.defiTrading.subtext"),
    },
    {
      badge: t("cards.evmContract.badge"),
      badgeClass: "bg-crystal-blue/20 text-crystal-blue border border-crystal-blue/30",
      borderClass: "border-crystal-blue/30 hover:border-crystal-blue",
      glowClass: "from-crystal-blue/20 to-frost-blue/20",
      icon: FileText,
      iconClass: "bg-gradient-to-br from-crystal-blue/20 to-frost-blue/20 text-crystal-blue border border-crystal-blue/30",
      arrowClass: "text-crystal-blue",
      benefitClass: "text-crystal-blue",
      title: t("cards.evmContract.title"),
      subtitle: t("cards.evmContract.subtitle"),
      features: [
        t("cards.evmContract.features.0"),
        t("cards.evmContract.features.1"),
        t("cards.evmContract.features.2"),
        t("cards.evmContract.features.3"),
      ],
      benefit: t("cards.evmContract.benefit"),
      subtext: t("cards.evmContract.subtext"),
    },
    {
      badge: t("cards.customerSupport.badge"),
      badgeClass: "bg-frost-blue/20 text-frost-blue border border-frost-blue/30",
      borderClass: "border-frost-blue/30 hover:border-frost-blue",
      glowClass: "from-frost-blue/20 to-ice-blue/20",
      icon: Headphones,
      iconClass: "bg-gradient-to-br from-frost-blue/20 to-ice-blue/20 text-frost-blue border border-frost-blue/30",
      arrowClass: "text-frost-blue",
      benefitClass: "text-frost-blue",
      title: t("cards.customerSupport.title"),
      subtitle: t("cards.customerSupport.subtitle"),
      features: [
        t("cards.customerSupport.features.0"),
        t("cards.customerSupport.features.1"),
        t("cards.customerSupport.features.2"),
        t("cards.customerSupport.features.3"),
      ],
      benefit: t("cards.customerSupport.benefit"),
    },
    {
      badge: t("cards.ecommerce.badge"),
      badgeClass: "bg-ice-blue/20 text-ice-blue border border-ice-blue/30",
      borderClass: "border-ice-blue/30 hover:border-ice-blue",
      glowClass: "from-ice-blue/20 to-crystal-blue/20",
      icon: ShoppingCart,
      iconClass: "bg-gradient-to-br from-ice-blue/20 to-crystal-blue/20 text-ice-blue border border-ice-blue/30",
      arrowClass: "text-ice-blue",
      benefitClass: "text-ice-blue",
      title: t("cards.ecommerce.title"),
      subtitle: t("cards.ecommerce.subtitle"),
      features: [
        t("cards.ecommerce.features.0"),
        t("cards.ecommerce.features.1"),
        t("cards.ecommerce.features.2"),
        t("cards.ecommerce.features.3"),
      ],
      benefit: t("cards.ecommerce.benefit"),
    },
    {
      badge: t("cards.contentCreation.badge"),
      badgeClass: "bg-crystal-blue/20 text-crystal-blue border border-crystal-blue/30",
      borderClass: "border-crystal-blue/30 hover:border-crystal-blue",
      glowClass: "from-crystal-blue/20 to-frost-blue/20",
      icon: Edit,
      iconClass: "bg-gradient-to-br from-crystal-blue/20 to-frost-blue/20 text-crystal-blue border border-crystal-blue/30",
      arrowClass: "text-crystal-blue",
      benefitClass: "text-crystal-blue",
      title: t("cards.contentCreation.title"),
      subtitle: t("cards.contentCreation.subtitle"),
      features: [
        t("cards.contentCreation.features.0"),
        t("cards.contentCreation.features.1"),
        t("cards.contentCreation.features.2"),
        t("cards.contentCreation.features.3"),
      ],
      benefit: t("cards.contentCreation.benefit"),
    },
  ];

  return (
    <section id="use-cases" className="relative py-24 overflow-hidden bg-gradient-to-b from-deep-arctic via-frozen-slate/20 to-deep-arctic">
      {/* Ice crystal ambient effects */}
      <div className="absolute inset-0 ice-crystal opacity-20"></div>
      <div className="absolute top-40 left-10 w-96 h-96 bg-frost-blue/5 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-ice-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '-5s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300 }}
                className={`group relative frosted-glass rounded-2xl p-8 border-2 ${useCase.borderClass} hover:shadow-2xl transition-all duration-500 overflow-hidden`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${useCase.glowClass} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  {/* Badge */}
                  <div className={`absolute top-0 right-0 ${useCase.badgeClass} text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                    {useCase.badge}
                  </div>

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6 mt-2">
                    <div className={`w-16 h-16 ${useCase.iconClass} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-orbitron font-bold mb-2 text-white group-hover:text-frost-blue transition-colors">
                        {useCase.title}
                      </h3>
                      <p className="text-slate-400 text-sm">{useCase.subtitle}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {useCase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-slate-300 group-hover:text-slate-200 transition-colors">
                        <span className={`${useCase.arrowClass} font-bold text-lg flex-shrink-0`}>→</span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benefit */}
                  <div className="flex flex-col gap-2">
                    <div className={`flex items-center gap-2 text-sm ${useCase.benefitClass} font-bold group-hover:scale-105 transition-transform duration-300`}>
                      <span>{useCase.benefit}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    {useCase.subtext && (
                      <div className="text-xs text-slate-500 italic">{useCase.subtext}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-2xl text-slate-300 mb-6">
            {t("cta")}
          </p>
          <a
            href="https://flow.frostylabs.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-frost-blue to-crystal-blue hover:from-ice-blue hover:to-frost-blue text-white font-bold px-10 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-frost-blue/50 pulse-glow"
          >
            {t("ctaButton")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

