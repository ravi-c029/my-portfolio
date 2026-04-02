"use client";

import { useViewStore } from "@/store/useViewStore";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { Layers, Code2, Target, Cpu, Globe, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.6, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: EASE_SPRING },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

const statCardVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_SPRING },
  },
};

// ─── ANIMATED COUNTER HOOK ───────────────────────────────────────────
function useAnimatedCounter(target: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, startCounting]);
  return count;
}

// ─── FLOATING PARTICLES COMPONENT ────────────────────────────────────
function FloatingParticles({ isSpatialMode }: { isSpatialMode: boolean }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={cn(
            "absolute rounded-full",
            isSpatialMode ? "bg-cyan-400/30" : "bg-neutral-400/15"
          )}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── ORBITAL RING COMPONENT ─────────────────────────────────────────
function OrbitalRing({
  size,
  duration,
  delay,
  isSpatialMode,
  reverse = false,
  dotCount = 3,
}: {
  size: string;
  duration: number;
  delay: number;
  isSpatialMode: boolean;
  reverse?: boolean;
  dotCount?: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: EASE_OUT }}
    >
      <motion.div
        className={cn(
          "rounded-full border border-dashed",
          isSpatialMode ? "border-cyan-500/25" : "border-neutral-300/40"
        )}
        style={{ width: size, height: size }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {/* Orbiting dots */}
        {Array.from({ length: dotCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1.5 h-1.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
              isSpatialMode ? "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" : "bg-neutral-400"
            )}
            style={{
              transform: `rotate(${(360 / dotCount) * i}deg) translateY(-${parseInt(size) / 2}px)`,
              transformOrigin: `center ${parseInt(size) / 2}px`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// ─── MAIN ABOUT COMPONENT ───────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════
export default function About() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const rotateOnScroll = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const smoothRotate = useSpring(rotateOnScroll, { stiffness: 50, damping: 20 });

  // Animated counters
  const projectCount = useAnimatedCounter(5, 1800, statsInView);
  const experienceCount = useAnimatedCounter(1, 1500, statsInView);

  // ─── SECTION HEADER ────────────────────────────────────────────────
  const sectionHeader = (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="text-center mb-12 md:mb-16"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_SPRING }}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase mb-5",
          isSpatialMode
            ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
            : "bg-neutral-100 border border-neutral-200/60 text-neutral-500"
        )}
      >
        <Sparkles className="w-3 h-3" />
        {isSpatialMode ? "SYSTEM.ARCHITECT" : "Get to Know Me"}
      </motion.div>

      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-500",
          isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]"
        )}
      >
        {isSpatialMode ? (
          <>
            {">"} About the{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              Founder
            </span>
          </>
        ) : (
          <>
            About the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-900">
              Founder
            </span>
          </>
        )}
      </h2>
    </motion.div>
  );

  // ─── CIRCULAR IMAGE WITH ORBITAL ANIMATIONS ────────────────────────
  const imageBlock = (
    <motion.div
      ref={imageContainerRef}
      variants={scaleReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full lg:w-5/12 flex flex-col items-center gap-8"
    >
      {/* Image container with orbital rings */}
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px]">
        {/* Orbital rings */}
        <OrbitalRing size="360" duration={20} delay={0.2} isSpatialMode={isSpatialMode} dotCount={4} />
        <OrbitalRing size="310" duration={15} delay={0.4} isSpatialMode={isSpatialMode} reverse dotCount={3} />
        <OrbitalRing size="260" duration={25} delay={0.6} isSpatialMode={isSpatialMode} dotCount={2} />

        {/* Pulsing glow behind image */}
        <motion.div
          className={cn(
            "absolute inset-[15%] rounded-full",
            isSpatialMode
              ? "bg-cyan-500/20 shadow-[0_0_80px_rgba(6,182,212,0.3)]"
              : "bg-neutral-200/50 shadow-[0_0_60px_rgba(0,0,0,0.08)]"
          )}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main profile circle */}
        <motion.div
          style={{ y: parallaxY, scale: parallaxScale }}
          className="absolute inset-[12%] z-10"
        >
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "w-full h-full rounded-full overflow-hidden group p-[3px] relative",
              isSpatialMode
                ? "shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]"
                : "shadow-2xl hover:shadow-[0_10px_50px_rgba(0,0,0,0.15)]"
            )}
          >
            {/* Rotating conic border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className={cn(
                "absolute inset-[-50%] z-0",
                isSpatialMode
                  ? "bg-[conic-gradient(from_0deg,transparent_60%,#06b6d4_80%,#22d3ee_100%)]"
                  : "bg-[conic-gradient(from_0deg,transparent_60%,#D1D1D6_80%,#A1A1AA_100%)]"
              )}
            />

            {/* Inner image container */}
            <div
              className={cn(
                "relative z-10 w-full h-full rounded-full overflow-hidden flex items-end justify-center",
                isSpatialMode ? "bg-[#050505]" : "bg-[#F5F5F7]"
              )}
            >
              <img
                src="/ravi-profile.jpg"
                alt="Ravi Kumar Keshari"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                  isSpatialMode
                    ? "opacity-70 grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-100"
                    : "opacity-100 group-hover:scale-105"
                )}
              />

              {/* Overlay gradient */}
              {isSpatialMode && (
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-cyan-500/10 pointer-events-none" />
              )}

              {/* Name badge */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className={cn(
                  "relative z-10 text-[10px] font-mono font-bold mb-4 px-3 py-1 rounded-full backdrop-blur-md transition-all duration-300",
                  isSpatialMode
                    ? "bg-black/70 text-cyan-400 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                    : "bg-white/90 text-neutral-700 border border-neutral-200 shadow-md"
                )}
              >
                FOUNDER
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Corner decorative elements */}
        {isSpatialMode && (
          <>
            <motion.div
              className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-lg z-20"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-lg z-20"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </>
        )}
      </div>

      {/* ── STAT CARDS BELOW IMAGE (Mobile: side-by-side, Desktop: side-by-side) ────── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        onViewportEnter={() => setStatsInView(true)}
        className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[360px]"
      >
        {/* Stat 1 */}
        <motion.div
          variants={statCardVariant}
          whileHover={{
            scale: 1.05,
            y: -4,
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
          className={cn(
            "p-4 sm:p-5 rounded-2xl transition-all duration-500 group cursor-default relative overflow-hidden",
            isSpatialMode
              ? "bg-black/50 border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]"
              : "bg-white border border-neutral-200/60 shadow-sm hover:shadow-lg"
          )}
        >
          {/* Hover shimmer */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
              isSpatialMode
                ? "bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent"
                : "bg-gradient-to-br from-neutral-100/80 via-transparent to-transparent"
            )}
          />
          <Layers
            className={cn(
              "mb-2 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12",
              isSpatialMode ? "text-cyan-400" : "text-[#1D1D1F]"
            )}
            size={22}
          />
          <div
            className={cn(
              "text-2xl sm:text-3xl font-bold mb-0.5 relative z-10 tabular-nums",
              isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]"
            )}
          >
            {projectCount}+
          </div>
          <div
            className={cn(
              "text-[10px] sm:text-xs uppercase tracking-wider relative z-10",
              isSpatialMode ? "text-cyan-600 font-mono" : "text-neutral-500"
            )}
          >
            Projects
          </div>
        </motion.div>

        {/* Stat 2 */}
        <motion.div
          variants={statCardVariant}
          whileHover={{
            scale: 1.05,
            y: -4,
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
          className={cn(
            "p-4 sm:p-5 rounded-2xl transition-all duration-500 group cursor-default relative overflow-hidden",
            isSpatialMode
              ? "bg-black/50 border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]"
              : "bg-white border border-neutral-200/60 shadow-sm hover:shadow-lg"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
              isSpatialMode
                ? "bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent"
                : "bg-gradient-to-br from-neutral-100/80 via-transparent to-transparent"
            )}
          />
          <Code2
            className={cn(
              "mb-2 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12",
              isSpatialMode ? "text-cyan-400" : "text-[#1D1D1F]"
            )}
            size={22}
          />
          <div
            className={cn(
              "text-2xl sm:text-3xl font-bold mb-0.5 relative z-10 tabular-nums",
              isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]"
            )}
          >
            {experienceCount}+ Yr
          </div>
          <div
            className={cn(
              "text-[10px] sm:text-xs uppercase tracking-wider relative z-10",
              isSpatialMode ? "text-cyan-600 font-mono" : "text-neutral-500"
            )}
          >
            Experience
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  // ─── TEXT CONTENT BLOCK ────────────────────────────────────────────
  const contentBlock = (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full lg:w-7/12 flex flex-col justify-center"
    >
      {/* IIT Badge */}
      <motion.div
        variants={slideInFromRight}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide mb-6 w-fit",
          isSpatialMode
            ? "bg-cyan-950/30 border border-cyan-500/20 text-cyan-500"
            : "bg-neutral-100 border border-neutral-200/60 text-neutral-500"
        )}
      >
        <Zap className="w-3 h-3" />
        IIT Patna · Computer Science & Engineering
      </motion.div>

      {/* Paragraph 1 */}
      <motion.p
        variants={slideInFromRight}
        className={cn(
          "text-base sm:text-lg leading-relaxed mb-5 transition-colors duration-500",
          isSpatialMode ? "text-neutral-300 font-mono text-sm" : "text-neutral-600"
        )}
      >
        My journey into development started with a simple fascination for
        how things are built. As a Computer Science and Engineering student
        at IIT Patna, I quickly realized that writing functional code wasn&apos;t
        enough. The real impact happens when complex engineering meets
        flawless, cinematic design.
      </motion.p>

      {/* Paragraph 2 */}
      <motion.p
        variants={slideInFromRight}
        className={cn(
          "text-base sm:text-lg leading-relaxed mb-8 transition-colors duration-500",
          isSpatialMode ? "text-neutral-300 font-mono text-sm" : "text-neutral-600"
        )}
      >
        By combining my background in video editing with advanced web
        technologies like Next.js, React, and Three.js, I don&apos;t just build
        websites. I engineer digital environments. From developing civic
        engagement platforms like CivicRise India to building comprehensive
        management tools like Core-Connect, my focus has always been on
        solving real-world problems through robust, scalable code.
      </motion.p>

      {/* ── TECH STACK PILLS ──────────────────────────────────────── */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
        {["Next.js", "React", "Three.js", "TypeScript", "Node.js", "Framer Motion"].map(
          (tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.4, ease: EASE_SPRING }}
              whileHover={{ scale: 1.1, y: -2 }}
              className={cn(
                "px-3 py-1 rounded-full text-[11px] font-medium cursor-default transition-all duration-300",
                isSpatialMode
                  ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                  : "bg-neutral-100 border border-neutral-200/60 text-neutral-600 hover:bg-neutral-200/80 hover:shadow-sm"
              )}
            >
              {tech}
            </motion.span>
          )
        )}
      </motion.div>

      {/* ── MISSION BOX ───────────────────────────────────────────── */}
      <motion.div
        variants={fadeInUp}
        whileHover={{
          scale: 1.02,
          x: 6,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className={cn(
          "p-6 sm:p-8 rounded-2xl border-l-4 transition-all duration-500 group cursor-default relative overflow-hidden",
          isSpatialMode
            ? "bg-cyan-950/20 border-cyan-500 text-cyan-50 hover:bg-cyan-900/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-400"
            : "bg-white shadow-md border-[#1D1D1F] text-[#1D1D1F] hover:shadow-2xl hover:border-neutral-600"
        )}
      >
        {/* Hover gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
            isSpatialMode
              ? "bg-gradient-to-r from-cyan-500/10 to-transparent"
              : "bg-gradient-to-r from-neutral-100 to-transparent"
          )}
        />

        <div className="relative z-10 flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ rotate: 90, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Target
              className={cn(
                "transition-colors duration-500",
                isSpatialMode
                  ? "text-cyan-400 group-hover:text-cyan-300"
                  : "text-[#1D1D1F] group-hover:text-neutral-700"
              )}
              size={24}
            />
          </motion.div>
          <h3
            className={cn(
              "text-lg sm:text-xl font-bold transition-colors duration-300",
              isSpatialMode
                ? "font-mono uppercase group-hover:text-cyan-300"
                : "group-hover:text-neutral-800"
            )}
          >
            {isSpatialMode ? "OBJECTIVE" : "My Objective"}
          </h3>
        </div>
        <p
          className={cn(
            "italic leading-relaxed relative z-10 transition-colors duration-300 text-sm sm:text-base",
            isSpatialMode
              ? "text-cyan-200/80 font-mono text-sm group-hover:text-cyan-100"
              : "text-neutral-600 group-hover:text-neutral-900"
          )}
        >
          &quot;To bridge the gap between high-level software engineering and
          cinematic user experiences, delivering platforms that not only
          function flawlessly but command immediate trust and authority.&quot;
        </p>
      </motion.div>
    </motion.div>
  );

  // ─── ASSEMBLED ABOUT CONTENT ───────────────────────────────────────
  const aboutContent = (
    <div className="relative">
      <FloatingParticles isSpatialMode={isSpatialMode} />
      {sectionHeader}
      <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16 items-center lg:items-start relative z-10">
        {imageBlock}
        {contentBlock}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-24" id="about">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto px-5 md:px-6"
      >
        {isSpatialMode ? (
          <div className="glass-panel relative w-full rounded-3xl transition-all duration-500 ease-out overflow-hidden bg-black/30 backdrop-blur-2xl border border-cyan-500/20 p-6 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
            {aboutContent}
          </div>
        ) : (
          <div className="w-full py-6 md:py-10">{aboutContent}</div>
        )}
      </motion.div>
    </section>
  );
}
