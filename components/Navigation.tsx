"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LOCALES, COOKIE_KEY_LOCALE } from "@/lib/const";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    Cookies.set(COOKIE_KEY_LOCALE, newLocale, { expires: 365 });
    router.refresh();
  };

  const currentLocale = SUPPORTED_LOCALES.find((l) => l.code === locale);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/#use-cases", label: t("useCases") },
    { href: "/features", label: t("features") },
    { href: "/#pricing", label: t("pricing") },
    { href: "/about", label: t("about") },
    { href: "https://github.com/FrostyLabsAi", label: t("github"), external: true },
    { href: "https://x.com/FrostyLabsAi", label: t("twitter"), external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-frost-blue/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/resources/frostylogo.png"
              alt="Frosty Penguin Mascot"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-orbitron font-bold gradient-text">FrostyLabs.ai</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-slate-300 hover:text-frost-blue transition-all duration-300 hover:scale-105"
              >
                {link.label}
              </a>
            ))}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-slate-800/50 text-slate-300 border border-frost-blue/20 rounded-lg px-3 py-2 text-sm hover:border-frost-blue/50 hover:bg-slate-800/70 transition-all duration-300"
                >
                  {currentLocale?.name || "🇺🇸 English"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-frost-blue/20">
                {SUPPORTED_LOCALES.map((loc) => (
                  <DropdownMenuItem
                    key={loc.code}
                    onClick={() => handleLocaleChange(loc.code)}
                    className="text-slate-300 hover:text-frost-blue hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    {loc.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-frost-blue transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-slate-300 hover:text-frost-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-slate-800/50 text-slate-300 border border-frost-blue/20 rounded-lg px-3 py-2 text-sm hover:border-frost-blue/50 transition-colors w-full"
                  >
                    {currentLocale?.name || "🇺🇸 English"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-frost-blue/20 w-full">
                  {SUPPORTED_LOCALES.map((loc) => (
                    <DropdownMenuItem
                      key={loc.code}
                      onClick={() => {
                        handleLocaleChange(loc.code);
                        setMobileMenuOpen(false);
                      }}
                      className="text-slate-300 hover:text-frost-blue hover:bg-slate-700 cursor-pointer"
                    >
                      {loc.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

