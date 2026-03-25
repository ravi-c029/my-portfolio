"use client";

import { useRef, useState, useEffect } from "react";
import { useViewStore } from "@/store/useViewStore";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  MonitorPlay,
  Server,
  BrainCircuit,
  Bot,
  LineChart,
  Cpu,
  Target,
  X,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "web",
    icon: MonitorPlay,
    title: "Full-Stack Web Dev",
    spatialTitle: "Full-Stack Web Dev",
    description:
      "Engineering highly responsive, scalable, and cinematic web interfaces. Focused on flawless user experiences.",
    tags: ["React", "Next.js", "Three.js"],
    steps: ["UI/UX RENDER", "STATE_SYNC", "DOM_MUTATION", "CLIENT_DELIVERY"],
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend Architecture",
    spatialTitle: "Backend Architecture",
    description:
      "Designing resilient, high-traffic server infrastructures and APIs with top-tier security and system design.",
    tags: ["Node.js", "System Design", "AWS"],
    steps: ["API_GATEWAY", "LOAD_BALANCER", "DB_QUERY", "RES_PAYLOAD"],
  },
  {
    id: "genai",
    icon: BrainCircuit,
    title: "Generative AI Solutions",
    spatialTitle: "GEN_AI",
    description:
      "Integrating cutting-edge Large Language Models (LLMs) and RAG pipelines to build intelligent, context-aware applications.",
    tags: ["LLMs", "RAG", "OpenAI"],
    steps: ["PROMPT_INJECT", "VECTOR_SEARCH", "LLM_INFERENCE", "TOKEN_STREAM"],
  },
  {
    id: "agentic",
    icon: Bot,
    title: "Agentic AI Automation",
    spatialTitle: "AGENTIC AI AUTOMATION",
    description:
      "Developing autonomous AI agents capable of complex reasoning, tool usage, and end-to-end workflow automation.",
    tags: ["LangChain", "Python", "Autonomous"],
    steps: ["TASK_PARSING", "TOOL_SELECTION", "EXECUTION_LOOP", "GOAL_REACHED"],
  },
  {
    id: "data",
    icon: LineChart,
    title: "Data Science & ML",
    spatialTitle: "Data Science & ML",
    description:
      "Extracting actionable insights through statistical modeling, predictive analytics, and machine learning algorithms.",
    tags: ["Machine Learning", "Pandas", "Stats"],
    steps: ["DATA_INGESTION", "FEATURE_ENG", "MODEL_TRAINING", "PREDICTION"],
  },
  {
    id: "core",
    icon: Cpu,
    title: "Core Engineering & DSA",
    spatialTitle: "CORE ENGINEERING & DSA",
    description:
      "Optimizing complex systems with advanced Data Structures, efficient algorithms, and low-latency execution logic.",
    tags: ["DSA", "Optimization", "C++ / Java"],
    steps: ["INPUT_STREAM", "ALGO_PROCESS", "MEM_ALLOCATE", "O(1)_OUTPUT"],
  },
  {
    id: "strategy",
    icon: Target,
    title: "Product Strategy",
    spatialTitle: "PRODUCT_STRATEGY",
    description:
      "Defining clear product visions and strategies aligned with market needs and technical feasibility.",
    tags: ["Strategy", "Product Management"],
    steps: ["MARKET_RESEARCH", "USER_PERSONAS", "ROADMAP_DEF", "MVP_LAUNCH"],
  },
];

const duplicatedServices = [...services, ...services, ...services];

function ServiceCard({
  service,
  isSpatialMode,
  onClick,
}: {
  service: any;
  isSpatialMode: boolean;
  onClick: () => void;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative w-[280px] md:w-[300px] h-[300px] md:h-[320px] shrink-0 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center justify-center text-center p-6 md:p-8 transition-all duration-500 group overflow-hidden cursor-pointer",
        isSpatialMode
          ? "bg-black/60 border border-cyan-900/40 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          : "bg-white border border-[#E5E5EA] shadow-lg hover:shadow-2xl hover:border-neutral-300",
      )}
    >
      <div
        className="hidden md:block absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isSpatialMode
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6,182,212,0.2), transparent 40%)`
            : `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.05), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center h-full">
        <div
          className={cn(
            "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-5 transition-transform duration-500 group-hover:scale-110",
            isSpatialMode
              ? "bg-cyan-950/50 border border-cyan-800 text-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              : "bg-[#F5F5F7] border border-[#E5E5EA] text-[#1D1D1F]",
          )}
        >
          <service.icon size={20} className="md:w-6 md:h-6" />
        </div>
        <h3
          className={cn(
            "text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-500",
            isSpatialMode
              ? "text-white font-mono uppercase group-hover:text-cyan-300"
              : "text-[#1D1D1F]",
          )}
        >
          {isSpatialMode ? service.spatialTitle : service.title}
        </h3>
        <p
          className={cn(
            "text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3",
            isSpatialMode
              ? "text-neutral-400 font-mono text-[10px] md:text-xs"
              : "text-neutral-600",
          )}
        >
          {service.description}
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mt-auto">
          {service.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className={cn(
                "text-[8px] md:text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider transition-colors",
                isSpatialMode
                  ? "bg-cyan-950/50 text-cyan-500 border border-cyan-900 group-hover:border-cyan-500/50"
                  : "bg-[#F5F5F7] text-neutral-500 border border-[#E5E5EA] group-hover:text-[#1D1D1F]",
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// --- NEW & RESPONSIVE COMPONENT: THE NEURAL PROCESS FLOW ---
function NeuralProcessFlow({
  steps,
  isSpatialMode,
}: {
  steps: string[];
  isSpatialMode: boolean;
}) {
  return (
    <div className="w-full mt-6 mb-2">
      {/* ------------------------------------------- */}
      {/* 1. DESKTOP VIEW (Horizontal Pipeline)         */}
      {/* ------------------------------------------- */}
      <div className="hidden md:flex relative w-full justify-between items-start px-0">
        {/* The SVG Track Container - Mathematically locked to circle centers */}
        <div className="absolute top-[20px] left-[40px] right-[40px] h-[2px] -translate-y-1/2 z-0">
          <svg className="w-full h-full overflow-visible">
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke={
                isSpatialMode ? "rgba(6,182,212,0.3)" : "rgba(0,0,0,0.15)"
              }
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Main Electron */}
            <motion.circle
              r={isSpatialMode ? "4" : "3"}
              fill={isSpatialMode ? "#06b6d4" : "#1D1D1F"}
              filter={isSpatialMode ? "drop-shadow(0 0 8px #06b6d4)" : "none"}
              initial={{ cx: "0%", cy: "0", opacity: 0 }}
              animate={{ cx: ["0%", "50%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Secondary Electron */}
            <motion.circle
              r={isSpatialMode ? "3" : "2"}
              fill={isSpatialMode ? "#22d3ee" : "#6b7280"}
              filter={isSpatialMode ? "drop-shadow(0 0 6px #22d3ee)" : "none"}
              initial={{ cx: "0%", cy: "0", opacity: 0 }}
              animate={{ cx: ["0%", "50%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: 1.2,
              }}
            />
          </svg>
        </div>

        {/* Desktop Nodes */}
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative z-10 flex flex-col items-center gap-3 w-[80px]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.2, type: "spring" }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2",
                isSpatialMode
                  ? "bg-[#050505] border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-white border-[#1D1D1F] shadow-md",
              )}
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full animate-pulse",
                  isSpatialMode ? "bg-cyan-400" : "bg-[#1D1D1F]",
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 + 0.1 }}
              className={cn(
                "text-[10px] font-bold tracking-widest uppercase text-center w-full",
                isSpatialMode ? "text-cyan-500 font-mono" : "text-neutral-600",
              )}
            >
              {step}
            </motion.div>
          </div>
        ))}
      </div>

      {/* ------------------------------------------- */}
      {/* 2. MOBILE VIEW (Vertical Pipeline)            */}
      {/* ------------------------------------------- */}
      <div className="flex md:hidden relative w-full flex-col justify-between gap-6 px-0 py-2">
        {/* The SVG Track Container - Mathematically locked to vertical centers */}
        <div className="absolute left-[16px] top-[24px] bottom-[24px] w-[2px] -translate-x-1/2 z-0">
          <svg className="w-full h-full overflow-visible">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke={
                isSpatialMode ? "rgba(6,182,212,0.3)" : "rgba(0,0,0,0.15)"
              }
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Main Electron */}
            <motion.circle
              r={isSpatialMode ? "4" : "3"}
              fill={isSpatialMode ? "#06b6d4" : "#1D1D1F"}
              filter={isSpatialMode ? "drop-shadow(0 0 8px #06b6d4)" : "none"}
              initial={{ cx: "0", cy: "0%", opacity: 0 }}
              animate={{ cy: ["0%", "50%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Secondary Electron */}
            <motion.circle
              r={isSpatialMode ? "3" : "2"}
              fill={isSpatialMode ? "#22d3ee" : "#6b7280"}
              filter={isSpatialMode ? "drop-shadow(0 0 6px #22d3ee)" : "none"}
              initial={{ cx: "0", cy: "0%", opacity: 0 }}
              animate={{ cy: ["0%", "50%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: 1.2,
              }}
            />
          </svg>
        </div>

        {/* Mobile Nodes */}
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative z-10 flex flex-row items-center gap-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.2, type: "spring" }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0",
                isSpatialMode
                  ? "bg-[#050505] border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-white border-[#1D1D1F] shadow-sm",
              )}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  isSpatialMode ? "bg-cyan-400" : "bg-[#1D1D1F]",
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 + 0.1 }}
              className={cn(
                "text-[10px] font-bold tracking-widest uppercase",
                isSpatialMode ? "text-cyan-500 font-mono" : "text-neutral-700",
              )}
            >
              {step}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function Services() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringArea, setIsHoveringArea] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null); // State for Modal
  const scrollX = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useAnimationFrame((t, delta) => {
    if ((isMobile || isHoveringArea) && !selectedService) {
      // Pause animation if modal is open
      let currentX = scrollX.get();
      const speedMultiplier = isMobile ? 0.08 : 0.15;
      currentX -= delta * speedMultiplier;

      // FIXED BUG: Loop width depends on TOTAL number of unique cards (7 cards)
      // Mobile: 7 * (280 + 24) = 2128
      // Desktop: 7 * (300 + 24) = 2268
      const loopWidth = isMobile ? 2128 : 2268;

      if (currentX <= -loopWidth) {
        currentX = 0;
      }
      scrollX.set(currentX);
    }
  });

  return (
    <section className="py-16 md:py-24 overflow-hidden relative" id="services">
      <div className="mb-8 md:mb-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <h2
            className={cn(
              "text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500",
              isSpatialMode
                ? "text-white font-mono uppercase"
                : "text-[#1D1D1F]",
            )}
          >
            {isSpatialMode ? "> SKILLS & SERVICES" : "Skills & Services"}
          </h2>
          <div
            className={cn(
              "w-16 md:w-20 h-1 mt-4 md:mt-6 transition-colors duration-500",
              isSpatialMode
                ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                : "bg-[#1D1D1F]",
            )}
          />
        </div>
        <div
          className={cn(
            "flex items-center gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest",
            isSpatialMode
              ? "text-cyan-500 font-mono animate-pulse"
              : "text-neutral-400",
          )}
        >
          <Target size={14} className="md:w-4 md:h-4" />
          {isSpatialMode
            ? "SCANNING_MODULES..."
            : isMobile
              ? "Tap to explore"
              : "Hover to explore"}
        </div>
      </div>

      <div
        className="relative w-full py-6 md:py-12 cursor-grab active:cursor-grabbing"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
        onMouseEnter={() => !isMobile && setIsHoveringArea(true)}
        onMouseLeave={() => !isMobile && setIsHoveringArea(false)}
      >
        <motion.div
          ref={containerRef}
          style={{ x: scrollX }}
          className="flex gap-6 px-4 md:px-6 w-max items-center"
        >
          {duplicatedServices.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              isSpatialMode={isSpatialMode}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </motion.div>
      </div>

      {/* --- MODAL FOR NEURAL PROCESS FLOW --- */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[2rem] p-6 md:p-10 shadow-2xl z-10 no-scrollbar",
                isSpatialMode
                  ? "bg-[#050505] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                  : "bg-white border border-[#E5E5EA]",
              )}
            >
              <button
                onClick={() => setSelectedService(null)}
                className={cn(
                  "absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full transition-colors z-20",
                  isSpatialMode
                    ? "bg-cyan-950/80 text-cyan-500 hover:bg-cyan-900"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-black",
                )}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    isSpatialMode
                      ? "bg-cyan-950/50 text-cyan-400 border border-cyan-800"
                      : "bg-neutral-100 text-black",
                  )}
                >
                  <selectedService.icon size={24} />
                </div>
                <div>
                  <h3
                    className={cn(
                      "text-xl md:text-2xl font-bold leading-tight",
                      isSpatialMode
                        ? "text-white font-mono uppercase"
                        : "text-[#1D1D1F]",
                    )}
                  >
                    {isSpatialMode
                      ? selectedService.spatialTitle
                      : selectedService.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs md:text-sm font-semibold mt-1",
                      isSpatialMode ? "text-cyan-500/70" : "text-neutral-500",
                    )}
                  >
                    Execution Trace Visualization
                  </p>
                </div>
              </div>

              {/* The Live Electron Graphic */}
              <div
                className={cn(
                  "w-full rounded-2xl p-4 md:p-6 relative overflow-hidden",
                  isSpatialMode
                    ? "bg-cyan-950/10 border border-cyan-900/30"
                    : "bg-neutral-50 border border-neutral-100",
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity
                    size={14}
                    className={
                      isSpatialMode ? "text-cyan-500" : "text-neutral-500"
                    }
                  />
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      isSpatialMode
                        ? "text-cyan-500 font-mono"
                        : "text-neutral-500",
                    )}
                  >
                    Live Process Flow
                  </span>
                </div>

                {/* Renders the nodes and moving electrons */}
                <NeuralProcessFlow
                  steps={selectedService.steps}
                  isSpatialMode={isSpatialMode}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
