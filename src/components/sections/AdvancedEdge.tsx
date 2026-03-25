"use client";

import { useState, useEffect, useRef } from "react"; // Added useRef
import { useViewStore } from "@/store/useViewStore";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Video, Terminal, Cpu, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import ProcessModal from "../ui/ProcessModal";

export default function AdvancedEdge() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const [latency, setLatency] = useState(14);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(
    null,
  );

  // Ref for Mobile Autoplay Fix
  const videoRef = useRef<HTMLVideoElement>(null);

  // Real-time animation logic for the graph
  const [bars, setBars] = useState(
    Array.from({ length: 15 }, () => Math.random() * 100),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (16 - 12 + 1)) + 12);
      setBars((prev) => [...prev.slice(1), Math.random() * 100]);
    }, 800);

    // Force play video on mount (Mobile Fix)
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch(() => console.log("Waiting for user interaction..."));
    }

    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    {
      id: "performance",
      icon: Activity,
      title: "System Health",
      spatialTitle: "PERFORMANCE",
      desc: "Monitoring real-time performance metrics and sub-second execution.",
    },
    {
      id: "video",
      icon: Video,
      title: "Cinematic Motion",
      spatialTitle: "Cinematic Web",
      desc: "Integrated high-fidelity video processing within the web environment.",
    },
    {
      id: "terminal",
      icon: Terminal,
      title: "Command Center",
      spatialTitle: "Command Center",
      desc: "Efficiency first navigation. Control the entire workspace via keyboard.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="edge">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h2
            className={cn(
              "text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-500",
              isSpatialMode ? "text-white font-mono uppercase" : "text-black",
            )}
          >
            {isSpatialMode ? "> THE ENGINEERING EDGE" : "The Engineering Edge"}
          </h2>
          <div
            className={cn(
              "w-20 h-1 mt-6 transition-colors duration-500",
              isSpatialMode
                ? "bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                : "bg-[#1D1D1F]",
            )}
          />
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {capabilities.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedCapability(item.id)}
              whileHover={{ y: -10, scale: 1.02 }}
              className={cn(
                "p-8 rounded-[2.5rem] relative overflow-hidden border group transition-all duration-500 cursor-pointer flex flex-col justify-center",
                // Height handling: Video card needs explicit height on mobile, others grow naturally
                item.id === "video"
                  ? "h-[400px] md:h-auto"
                  : "min-h-[350px] md:min-h-0",
                isSpatialMode
                  ? "bg-[#050505] border-cyan-500/10 hover:border-cyan-400/50"
                  : "bg-white border-neutral-100 shadow-xl hover:shadow-2xl",
              )}
            >
              {/* --- 1. SYSTEM HEALTH --- */}
              {item.id === "performance" && (
                <>
                  <Activity className="text-cyan-500 mb-6" size={28} />
                  <h3
                    className={cn(
                      "text-xl font-bold mb-4",
                      isSpatialMode && "font-mono text-white",
                    )}
                  >
                    System Health
                  </h3>
                  <p
                    className={cn(
                      "text-sm mb-8 leading-relaxed",
                      isSpatialMode
                        ? "text-neutral-500 font-mono"
                        : "text-neutral-600",
                    )}
                  >
                    Monitoring real-time performance metrics and sub-second
                    execution.
                  </p>
                  <div className="flex items-end gap-1 h-12 mb-6">
                    {bars.map((height, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: `${height}%` }}
                        className="w-full bg-cyan-500/20 border-t border-cyan-500/40 rounded-t-sm"
                      />
                    ))}
                  </div>
                  <div
                    className={cn(
                      "flex justify-between items-center text-[10px] font-bold uppercase",
                      isSpatialMode
                        ? "font-mono text-cyan-500"
                        : "text-neutral-400",
                    )}
                  >
                    <span>Latency: {latency}ms</span>
                    <span className="flex items-center gap-1">
                      <Zap size={10} /> 60 FPS
                    </span>
                  </div>
                </>
              )}

              {/* --- 2. CINEMATIC MOTION (WITH 3D FLIP) --- */}
              {item.id === "video" && (
                <div className="absolute inset-0 perspective-1000">
                  <motion.div
                    className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:[transform:rotateY(180deg)] group-active:[transform:rotateY(180deg)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* FRONT SIDE */}
                    <div
                      className={cn(
                        "absolute inset-0 backface-hidden p-8 flex flex-col items-start justify-center",
                        isSpatialMode ? "bg-black" : "bg-white",
                      )}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Video className="text-cyan-500 mb-6" size={28} />
                      <h3
                        className={cn(
                          "text-xl font-bold mb-4",
                          isSpatialMode && "font-mono text-white",
                        )}
                      >
                        Cinematic Motion
                      </h3>
                      <p
                        className={cn(
                          "text-sm mb-8 leading-relaxed",
                          isSpatialMode
                            ? "text-neutral-500 font-mono"
                            : "text-neutral-600",
                        )}
                      >
                        Integrated high-fidelity video processing within the web
                        environment.
                      </p>
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase",
                          isSpatialMode
                            ? "bg-cyan-950/50 text-cyan-500 border border-cyan-900"
                            : "bg-neutral-50 text-neutral-400 border border-neutral-100",
                        )}
                      >
                        <Cpu size={12} /> WebGL & GPU Accelerated
                      </div>
                      <div className="absolute bottom-6 right-8 text-[8px] text-cyan-500/40 font-mono animate-pulse uppercase">
                        [ Tap/Hover to Preview ]
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div
                      className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      >
                        <source src="/reel-preview.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-end p-6">
                        <div className="text-[10px] font-mono text-cyan-400 opacity-70">
                          Live View_24FPS
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* --- 3. COMMAND CENTER --- */}
              {item.id === "terminal" && (
                <>
                  <Terminal className="text-cyan-500 mb-6" size={28} />
                  <h3
                    className={cn(
                      "text-xl font-bold mb-4",
                      isSpatialMode && "font-mono text-white",
                    )}
                  >
                    Command Center
                  </h3>
                  <p
                    className={cn(
                      "text-sm mb-8 leading-relaxed",
                      isSpatialMode
                        ? "text-neutral-500 font-mono"
                        : "text-neutral-600",
                    )}
                  >
                    Efficiency first navigation. Control the entire workspace
                    via keyboard.
                  </p>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-neutral-900 border border-white/10 rounded text-[10px] text-white">
                      CTRL
                    </kbd>
                    <span className="text-white text-xs">+</span>
                    <kbd className="px-2 py-1 bg-neutral-900 border border-white/10 rounded text-[10px] text-white">
                      K
                    </kbd>
                    <span
                      className={cn(
                        "ml-4 text-[10px] font-bold tracking-widest uppercase animate-pulse",
                        isSpatialMode
                          ? "font-mono text-cyan-500"
                          : "text-neutral-400",
                      )}
                    >
                      AWAITING_INPUT...
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedCapability && (
          <ProcessModal
            id={selectedCapability}
            isSpatialMode={isSpatialMode}
            onClose={() => setSelectedCapability(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
