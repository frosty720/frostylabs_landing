"use client";

import Image from "next/image";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-frost-blue/20 bg-gradient-to-b from-deep-arctic to-frozen-slate overflow-hidden">
      {/* Ice crystal effect */}
      <div className="absolute inset-0 ice-crystal opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <Image
              src="/resources/frostylogo.png"
              alt="Frosty Penguin"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-orbitron font-bold gradient-text">FrostyLabs.ai</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/FrostyLabsAi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-frost-blue transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/FrostyLabsAi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-frost-blue transition-all duration-300 hover:scale-110"
              aria-label="Twitter/X"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="text-center mt-8 text-slate-400">
          <p>&copy; 2025 FrostyLabs.ai. All rights reserved. • Made with <span className="text-frost-blue">❤️</span> & ☕ • Web3 Native • AI Powered.</p>
        </div>
      </div>
    </footer>
  );
}

