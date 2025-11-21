"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

interface ScreenshotPlaceholderProps {
    title: string;
    description: string;
    aspectRatio?: "video" | "square" | "wide";
    priority?: boolean;
}

export function ScreenshotPlaceholder({
    title,
    description,
    aspectRatio = "video",
    priority = false
}: ScreenshotPlaceholderProps) {
    const aspectClasses = {
        video: "aspect-video", // 16:9
        square: "aspect-square", // 1:1
        wide: "aspect-[21/9]", // Ultra-wide
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative ${aspectClasses[aspectRatio]} w-full overflow-hidden rounded-xl border-2 border-frost-blue/30 bg-gradient-to-br from-frozen-slate/50 to-deep-arctic/80 group hover:border-frost-blue/60 transition-all duration-300`}
        >
            {/* Ice crystal effect */}
            <div className="absolute inset-0 ice-crystal opacity-20"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 shimmer opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-frost-blue/20 to-ice-blue/20 border border-frost-blue/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ImageIcon className="w-8 h-8 text-frost-blue" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-orbitron">{title}</h3>
                <p className="text-sm text-slate-400 max-w-md">{description}</p>

                {/* Pro tip indicator */}
                <div className="mt-6 px-4 py-2 bg-frost-blue/10 border border-frost-blue/30 rounded-lg">
                    <p className="text-xs text-frost-blue font-semibold">
                        📸 Screenshot Placeholder • Replace with actual image
                    </p>
                </div>
            </div>

            {/* Corner badge for priority images */}
            {priority && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-frost-blue to-ice-blue rounded-full">
                    <span className="text-xs font-bold text-white">High Priority</span>
                </div>
            )}
        </motion.div>
    );
}
