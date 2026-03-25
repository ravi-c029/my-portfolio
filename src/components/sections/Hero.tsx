"use client";

import { useViewStore } from "@/store/useViewStore";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Hero() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  // 1. NAYE AUR MODERN WORDS
  const animatedWords = ["WebApps", "Interfaces", "Systems", "Solutions"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const heroContent = (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 w-full">
      {/* LEFT TEXT CONTENT */}
      <div className="w-full md:w-[55%] md:flex-1 space-y-5 md:space-y-6 flex flex-col items-start text-left">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-neutral-200/50 border border-neutral-300/50 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {isSpatialMode ? "Available for projects" : "Available for projects"}
        </div>

        {/* 2. HEADING TEXT CHOTA KIYA (text-3xl sm:text-4xl md:text-5xl) AUR NAYA TEXT */}
        <h1
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-snug transition-colors duration-500",
            isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
          )}
        >
          Crafting High-Performance <br className="hidden sm:block" />
          Digital{" "}
          {/* Animated Spinner Container (Min width adjust kiya chhote text ke hisaab se) */}
          <span className="inline-flex flex-col h-[1.2em] overflow-hidden align-top relative min-w-[180px] md:min-w-[220px]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={animatedWords[wordIndex]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                  "block absolute left-0 top-0 transition-colors duration-500",
                  isSpatialMode
                    ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-800",
                )}
              >
                {animatedWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Paragraph */}
        <p
          className={cn(
            "text-sm sm:text-base max-w-lg leading-relaxed transition-colors duration-500",
            isSpatialMode ? "text-neutral-400 font-mono" : "text-neutral-600",
          )}
        >
          I am Ravi Kumar Keshari. I engineer highly scalable web applications
          and cinematic 3D spatial interfaces that help brands scale and
          convert.
        </p>

        {/* Button */}
        <div className="w-full sm:w-auto pt-2">
          <button
            className={cn(
              "w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-3 md:px-7 md:py-3.5 rounded-xl font-medium transition-all duration-300 text-sm",
              isSpatialMode
                ? "bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                : "bg-[#1D1D1F] text-white hover:bg-neutral-800 hover:shadow-xl hover:-translate-y-1",
            )}
          >
            <a
              href="https://www.ravikeshari.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE/VISUAL */}
      <motion.div
        className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-md aspect-square mx-auto relative perspective-1000 z-10 mt-6 md:mt-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          // 3. GREEN TINT BUG FIX: Force filter clear on normal state
          animate={{
            y: [-8, 8, -8],
            filter: "hue-rotate(0deg)", // Ye ensure karega ki mode change pe color wapas normal aaye
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            filter: { duration: 0.2 }, // Filter reset transition
          }}
          whileHover={
            isSpatialMode
              ? {
                  scale: 1.05,
                  x: [0, -10, 10, -5, 5, 0],
                  skewX: [0, 5, -5, 10, -10, 0],
                  filter: [
                    "hue-rotate(0deg)",
                    "hue-rotate(90deg)",
                    "hue-rotate(-90deg)",
                    "hue-rotate(0deg)",
                  ],
                  transition: { duration: 0.3, ease: "easeInOut" },
                }
              : {
                  scale: 1.03,
                  rotateX: 2,
                  rotateY: -2,
                  filter: "hue-rotate(0deg)", // Executive hover pe color nahi bigdega
                  transition: { duration: 0.3, ease: "easeOut" },
                }
          }
          className={cn(
            "w-full h-full rounded-2xl flex items-center justify-center transition-all duration-500 group overflow-hidden relative",
            isSpatialMode
              ? "bg-black/50 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] hover:border-cyan-400/50"
              : "bg-white border border-neutral-200/60 shadow-xl hover:shadow-2xl",
          )}
        >
          <img
            src="/ravi-profile.jpg"
            alt="Founder - Ravi Kumar Keshari"
            className={cn(
              "w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.05]",
              isSpatialMode
                ? "opacity-70 grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-100"
                : "",
            )}
          />

          {isSpatialMode && (
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-cyan-500/10 pointer-events-none mix-blend-overlay" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <section
      className="relative min-h-[80vh] md:min-h-[85vh] flex items-center pt-28 md:pt-20 pb-12 md:pb-0"
      id="home"
    >
      <div className="w-full max-w-7xl mx-auto px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          {isSpatialMode ? (
            <div className="glass-panel relative w-full rounded-3xl transition-all duration-500 ease-out overflow-hidden bg-black/30 backdrop-blur-2xl border border-cyan-500/20 p-6 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
              {heroContent}
            </div>
          ) : (
            <div className="w-full py-6 md:py-12">{heroContent}</div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
