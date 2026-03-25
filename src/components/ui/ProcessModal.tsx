"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  X,
  Bot,
  FlaskConical,
  PencilRuler,
  Target,
  Rocket,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const processData = {
  performance: [
    {
      step: "01",
      icon: Bot,
      title: "Lighthouse Audit",
      desc: "Automated analysis of web vitals (LCP, FID, CLS).",
    },
    {
      step: "02",
      icon: PencilRuler,
      title: "Asset Optimization",
      desc: "Compression, resizing, and lazy-loading of media.",
    },
    {
      step: "03",
      icon: FlaskConical,
      title: "Logic Refactoring",
      desc: "Removing dead code, optimizing React renders (memo).",
    },
    {
      step: "04",
      icon: Target,
      title: "Infrastructure Tuning",
      desc: "Serverless config (AWS/Vercel) for minimal cold starts.",
    },
    {
      step: "05",
      icon: Rocket,
      title: "Continuous Monitoring",
      desc: "Setup alerts for performance degradation post-launch.",
    },
  ],
  video: [
    {
      step: "01",
      icon: FlaskConical,
      title: "Media Intake",
      desc: "Decoding various 4K ProRes and RAW codecs.",
    },
    {
      step: "02",
      icon: PencilRuler,
      title: "Timeline Engine",
      desc: "Building frame-perfect playback logic with WebGL.",
    },
    {
      step: "03",
      icon: Bot,
      title: "GPU Processing",
      desc: "Offloading color grading and effects to the GPU.",
    },
    {
      step: "04",
      icon: Target,
      title: "Memory Management",
      desc: "Efficient stream caching and garbage collection for web.",
    },
    {
      step: "05",
      icon: Rocket,
      title: "Final Render",
      desc: "Encoding optimized .mp4/WebM loops for fast delivery.",
    },
  ],
  terminal: [
    {
      step: "01",
      icon: Bot,
      title: "Input Listener",
      desc: "Capturing global keyboard events (Cmd/Ctrl + K).",
    },
    {
      step: "02",
      icon: PencilRuler,
      title: "Logic Resolver",
      desc: "Parsing string commands and mapping to system functions.",
    },
    {
      step: "03",
      icon: FlaskConical,
      title: "Index Service",
      desc: "Quick-search index of site pages, projects, and actions.",
    },
    {
      step: "04",
      icon: Target,
      title: "UI Rendering",
      desc: "Displaying the floating palette with motion animations.",
    },
    {
      step: "05",
      icon: Rocket,
      title: "Action Dispatcher",
      desc: "Executing navigation or downloading with proper handling.",
    },
  ],
};

const capabilityTitles = {
  performance: "System Health Flow",
  video: "Reel Engine Pipeline",
  terminal: "Command Center Logic",
};

export default function ProcessModal({ id, isSpatialMode, onClose }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0.25); // Cinematic Drift Speed
  const data = processData[id as keyof typeof processData];
  const title = capabilityTitles[id as keyof typeof capabilityTitles];

  // 1. Custom Scroll Progress for side indicator
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 2. THE AUTOMATION ENGINE (Cinematic Drift)
  useEffect(() => {
    let animationFrame: number;
    const autoScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += scrollSpeed;
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };
    animationFrame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [scrollSpeed]);

  // 3. MOUSE RESPONSE LOGIC
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientY, currentTarget } = e;
    const { top, height } = currentTarget.getBoundingClientRect();
    const relativeY = (clientY - top) / height;

    if (relativeY < 0.2) {
      setScrollSpeed(-3); // Scroll Up fast when mouse at top
    } else if (relativeY > 0.8) {
      setScrollSpeed(3); // Scroll Down fast when mouse at bottom
    } else {
      setScrollSpeed(0.25); // Default slow drift in middle
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-3xl"
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setScrollSpeed(0.25)}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className={cn(
          "relative w-full max-w-5xl h-[85vh] rounded-[3rem] shadow-2xl z-10 overflow-hidden",
          isSpatialMode
            ? "bg-[#050505] border border-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.2)]"
            : "bg-white border border-[#E5E5EA]",
        )}
      >
        {/* CUSTOM GLOW SCROLLBAR INDICATOR */}
        <div className="absolute right-4 top-24 bottom-24 w-[2px] bg-white/5 rounded-full z-50">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className={cn(
              "w-full h-full rounded-full",
              isSpatialMode
                ? "bg-cyan-500 shadow-[0_0_15px_#06b6d4]"
                : "bg-black",
            )}
          />
        </div>

        {/* SCROLLABLE AREA (Hidden Scrollbar) */}
        <div
          ref={scrollRef}
          className="w-full h-full overflow-y-auto p-8 md:p-16 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Header Section */}
          <div className="flex justify-between items-start mb-24">
            <div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                className={cn(
                  "h-1 mb-6",
                  isSpatialMode
                    ? "bg-cyan-500 shadow-[0_0_15px_#06b6d4]"
                    : "bg-black",
                )}
              />
              <h3
                className={cn(
                  "text-4xl md:text-6xl font-black tracking-tighter",
                  isSpatialMode ? "text-white font-mono" : "text-black",
                )}
              >
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-4 rounded-full hover:bg-neutral-500/10 transition-transform hover:rotate-90"
            >
              <X
                size={24}
                className={isSpatialMode ? "text-cyan-500" : "text-neutral-400"}
              />
            </button>
          </div>

          {/* --- NEURAL TIMELINE --- */}
          <div className="relative pb-32">
            <div
              className={cn(
                "absolute left-[31px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]",
                isSpatialMode ? "bg-white/5" : "bg-neutral-100",
              )}
            >
              <motion.div
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-64 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4]"
              />
            </div>

            <div className="space-y-40 relative z-10">
              {data.map((step, index) => {
                const isEven = index % 2 === 0;
                const Icon = step.icon;

                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-100px" }}
                    key={index}
                    className={cn(
                      "relative flex items-center md:justify-between",
                      isEven ? "md:flex-row-reverse" : "md:flex-row",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center z-10 transition-all duration-500",
                        isSpatialMode
                          ? "bg-black border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                          : "bg-white border shadow-md",
                      )}
                    >
                      <Icon size={24} />
                      {isSpatialMode && (
                        <motion.div
                          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-2xl border border-cyan-500"
                        />
                      )}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05, x: isEven ? -10 : 10 }}
                      className={cn(
                        "w-full md:w-[42%] ml-20 md:ml-0 p-8 rounded-[2.5rem] border transition-all duration-500",
                        isSpatialMode
                          ? "bg-neutral-900/40 border-white/5 hover:border-cyan-500/40"
                          : "bg-neutral-50 border-neutral-100 shadow-sm",
                      )}
                    >
                      <span className="text-[10px] font-black tracking-[0.3em] uppercase text-cyan-600">
                        Phase {step.step}
                      </span>
                      <h4
                        className={cn(
                          "text-xl font-bold mt-2 mb-3",
                          isSpatialMode ? "text-white font-mono" : "text-black",
                        )}
                      >
                        {step.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-neutral-500 font-mono">
                        {step.desc}
                      </p>
                    </motion.div>
                    <div className="hidden md:block w-[42%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="text-center opacity-10 font-mono text-[10px] tracking-[0.8em] mt-20 uppercase">
            SYSTEM_STREAM_END // 2026
          </div>
        </div>
      </motion.div>

      {/* Tailwind handles no-scrollbar, but adding it for safety */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
