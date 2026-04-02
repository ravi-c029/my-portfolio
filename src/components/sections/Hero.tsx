"use client";

import { useViewStore } from "@/store/useViewStore";
import { useUniverseStore } from "@/store/useUniverseStore";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// --- ANIMATION VARIANTS ---
const EASE_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

const fadeInFromTop: Variants = {
  hidden: { opacity: 0, y: -25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

const fadeInWithScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE_OUT, delay: 0.2 },
  },
};

const fadeInFromBottom: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT, delay: 0.4 },
  },
};

export default function Hero() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  const animatedWords = ["Full-Stack Apps", "Web Interfaces", "Design Systems", "Best Solutions"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── BLOCK A: MOBILE-ONLY NAME / IDENTITY ─────────────────────────
  const nameBlock = (
    <motion.div
      variants={fadeInFromTop}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="md:hidden order-1 flex flex-col items-center text-center"
    >
      {/* Status Badge (mobile) */}
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5",
          isSpatialMode
            ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
            : "bg-neutral-200/50 border border-neutral-300/50 text-neutral-600",
        )}
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Available for projects
      </div>

      <h2
        className={cn(
          "text-2xl font-bold -tracking-[0.02em] leading-tight mb-1.5",
          isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
        )}
      >
        Ravi Kumar Keshari
      </h2>
      <p
        className={cn(
          "text-[11px] font-semibold tracking-[0.15em] uppercase",
          isSpatialMode ? "text-cyan-500/70" : "text-neutral-400",
        )}
      >
        IIT Patna · Full-Stack Engineer
      </p>
    </motion.div>
  );

  // ─── BLOCK B: HERO IMAGE ───────────────────────────────────────────
  const imageBlock = (
    <motion.div
      variants={fadeInWithScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="order-2 w-full max-w-[260px] sm:max-w-[300px] md:max-w-md aspect-square mx-auto relative z-10"
    >
      <motion.div
        animate={{
          y: [-8, 8, -8],
          filter: "hue-rotate(0deg)",
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          filter: { duration: 0.2 },
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
                filter: "hue-rotate(0deg)",
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
  );

  // ─── BLOCK C: TEXT CONTENT + CTA ───────────────────────────────────
  const contentBlock = (
    <motion.div
      variants={fadeInFromBottom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="order-3 md:order-1 w-full md:w-[55%] md:flex-1 space-y-5 md:space-y-6 flex flex-col items-center text-center md:items-start md:text-left"
    >
      {/* Status Badge (desktop only — mobile has it in name block) */}
      <div
        className={cn(
          "hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium",
          isSpatialMode
            ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
            : "bg-neutral-200/50 border border-neutral-300/50 text-neutral-600",
        )}
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Available for projects
      </div>

      {/* Heading with animated word spinner */}
      <h1
        className={cn(
          "text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight transition-colors duration-500",
          isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
        )}
      >
        Creating{" "}
        <span className="flex flex-col md:inline-flex md:flex-col h-[1.3em] overflow-hidden align-top relative">
          {/* Invisible sizer — renders all words to auto-size the container */}
          {animatedWords.map((word) => (
            <span key={word} className="invisible block h-0 whitespace-nowrap" aria-hidden="true">
              {word}
            </span>
          ))}
          <AnimatePresence mode="popLayout">
            <motion.span
              key={animatedWords[wordIndex]}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={cn(
                "block absolute inset-x-0 top-0 whitespace-nowrap transition-colors duration-500",
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

      {/* CTA Button — Cosmic Portal Trigger */}
      <div className="w-full sm:w-auto pt-2">
        <motion.button
          onClick={() => useUniverseStore.getState().openUniverse()}
          animate={{
            scale: [0.97, 1, 0.97],
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 md:px-8 md:py-4 rounded-2xl font-semibold transition-all duration-300 text-sm relative overflow-hidden portal-btn",
            isSpatialMode
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.5),0_0_60px_rgba(6,182,212,0.2)]"
              : "bg-gradient-to-r from-[#1D1D1F] to-neutral-700 text-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5",
          )}
        >
          {/* Shimmer overlay */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          {/* Orbiting dot (CSS animated) */}
          <span className={cn(
            "absolute w-1.5 h-1.5 rounded-full portal-orbit-dot",
            isSpatialMode ? "bg-cyan-300 shadow-[0_0_6px_rgba(6,182,212,0.8)]" : "bg-white/40"
          )} />
          <Rocket className="w-4 h-4 group-hover:rotate-[-15deg] group-hover:-translate-y-0.5 transition-transform duration-300" />
          <span className="relative z-10">View Resume</span>
        </motion.button>
      </div>
    </motion.div>
  );

  // ─── ASSEMBLED HERO CONTENT ────────────────────────────────────────
  const heroContent = (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full">
      {nameBlock}
      {contentBlock}
      {imageBlock}
    </div>
  );

  return (
    <section
      className="relative min-h-[80vh] md:min-h-[85vh] flex items-center pt-28 md:pt-20 pb-12 md:pb-0"
      id="home"
    >
      <div className="w-full max-w-7xl mx-auto px-5 md:px-6">
        {isSpatialMode ? (
          <div className="glass-panel relative w-full rounded-3xl transition-all duration-500 ease-out overflow-hidden bg-black/30 backdrop-blur-2xl border border-cyan-500/20 p-6 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
            {heroContent}
          </div>
        ) : (
          <div className="w-full py-6 md:py-12">{heroContent}</div>
        )}
      </div>
    </section>
  );
}
