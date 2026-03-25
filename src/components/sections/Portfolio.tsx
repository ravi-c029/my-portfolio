"use client";

import { useState } from "react";
import { useViewStore } from "@/store/useViewStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowDown, // 👈 Naya icon import kiya hai mobile ke liye
  ExternalLink,
  X,
  MonitorPlay,
  Landmark,
  HeartPulse,
  Network,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Projects Data
const projects = [
  {
    id: "golf-charity-platform",
    title: "Golf Charity Subscription Platform",
    client: "Golf Clubs & Charity Organizations",
    icon: Trophy,
    problem:
      "Manual and inefficient processes for managing golf charity draws, subscriptions, and winner verification.",
    solution:
      "Built a full-stack platform using Next.js, Supabase, and Stripe to automate monthly draws, manage subscriptions, and handle winner proof submissions.",
    result:
      "Delivered an end-to-end automated system for charity golf draws with real-time admin controls, secure payments, and transparent winner management.",
    link: "https://golf-charity-subscription-platform-eta.vercel.app/",
  },
  {
    id: "civic-rise",
    title: "CivicRise India",
    client: "Civic Authorities & Citizens",
    icon: Landmark,
    problem:
      "Inefficient, scattered reporting of municipal issues like garbage dumps by citizens.",
    solution:
      "Developed a Progressive Web App (PWA) with citizen reporting tools and a dedicated administrative dashboard.",
    result:
      "Streamlined the reporting pipeline, enabling authorities to easily track and manage civic resolutions.",
    link: "https://civic-rise-india.tech/",
  },
  {
    id: "ravi-medical",
    title: "Ravi Medical Agency",
    client: "Ravi Medical Agency",
    icon: HeartPulse,
    problem:
      "Lack of digital presence and manual tracking for medical inventory and visitors.",
    solution:
      "Engineered a full website featuring a customer-facing portal and a comprehensive owner dashboard for inventory and visitor tracking.",
    result:
      "Centralized inventory management and established a professional digital footprint.",
    link: "https://www.ravimedical.in",
  },
  {
    id: "core-connect",
    title: "Core-Connect",
    client: "Academic Cohort",
    icon: Network,
    problem:
      "Scattered class announcements, meeting links, and PDFs across unorganized Telegram groups.",
    solution:
      "Created a unified web and desktop application to centralize all academic resources for the Telegram group.",
    result:
      "Drastically reduced information search time and created a single source of truth for the cohort.",
    link: "https://coreconnect.site/",
  },
];

export default function Portfolio() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <section className="py-24 relative" id="portfolio">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h2
            className={cn(
              "text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-500",
              isSpatialMode
                ? "text-white font-mono uppercase"
                : "text-[#1D1D1F]",
            )}
          >
            {isSpatialMode ? "> PROJECTS" : "Projects"}
          </h2>
          <div
            className={cn(
              "w-20 h-1 mt-6 transition-colors duration-500",
              isSpatialMode
                ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                : "bg-[#1D1D1F]",
            )}
          />
        </div>

        {/* --- THE TIMELINE (Vertical on Mobile, Horizontal on Desktop) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project) => (
            <div key={project.id} className="flex justify-center h-full">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProject(project)}
                className={cn(
                  "relative w-full p-6 rounded-[2.5rem] cursor-pointer transition-all duration-500 group flex flex-col items-center text-center",
                  isSpatialMode
                    ? "bg-black/60 border border-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                    : "bg-white border border-neutral-100 shadow-xl hover:shadow-2xl hover:border-neutral-200",
                )}
              >
                {/* 1. Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:rotate-[360deg]",
                    isSpatialMode
                      ? "bg-cyan-900/30 text-cyan-400 border border-cyan-800/50"
                      : "bg-neutral-50 text-[#1D1D1F]",
                  )}
                >
                  <project.icon size={24} />
                </div>

                {/* 2. Title */}
                <h3
                  className={cn(
                    "text-base md:text-lg font-bold mb-4 flex-grow flex items-center justify-center",
                    isSpatialMode
                      ? "text-white font-mono uppercase tracking-tighter"
                      : "text-[#1D1D1F]",
                  )}
                >
                  {project.title}
                </h3>

                {/* 3. Tag */}
                <span
                  className={cn(
                    "text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest",
                    isSpatialMode
                      ? "bg-cyan-950 text-cyan-500 border border-cyan-900/50"
                      : "bg-neutral-100 text-neutral-500",
                  )}
                >
                  Inspect Case
                </span>

                {/* Spatial Mode Ping Decoration */}
                {isSpatialMode && (
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. THE "VISIT WINDOW" MODAL (Kept Exactly the Same) --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-6 md:p-10 shadow-2xl z-10 custom-scrollbar",
                isSpatialMode
                  ? "bg-[#0a0a0a] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                  : "bg-white border border-[#E5E5EA]",
              )}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className={cn(
                  "absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full transition-colors z-20",
                  isSpatialMode
                    ? "bg-cyan-950/80 text-cyan-500 hover:bg-cyan-900"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-black",
                )}
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8 mt-4 md:mt-0">
                <div
                  className={cn(
                    "w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0",
                    isSpatialMode
                      ? "bg-cyan-950/50 text-cyan-400 border border-cyan-800"
                      : "bg-neutral-100 text-black",
                  )}
                >
                  <selectedProject.icon
                    size={32}
                    className="w-8 h-8 md:w-auto md:h-auto"
                  />
                </div>
                <div>
                  <h3
                    className={cn(
                      "text-xl md:text-3xl font-bold mb-1 md:mb-2 leading-tight",
                      isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
                    )}
                  >
                    {selectedProject.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs md:text-sm font-semibold",
                      isSpatialMode ? "text-cyan-500" : "text-neutral-500",
                    )}
                  >
                    Client: {selectedProject.client}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4
                    className={cn(
                      "text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2",
                      isSpatialMode ? "text-cyan-600" : "text-neutral-400",
                    )}
                  >
                    Problem
                  </h4>
                  <p
                    className={cn(
                      "text-sm md:text-base leading-relaxed",
                      isSpatialMode
                        ? "text-neutral-300 font-mono"
                        : "text-neutral-600",
                    )}
                  >
                    {selectedProject.problem}
                  </p>
                </div>
                <div>
                  <h4
                    className={cn(
                      "text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2",
                      isSpatialMode ? "text-cyan-600" : "text-neutral-400",
                    )}
                  >
                    Solution
                  </h4>
                  <p
                    className={cn(
                      "text-sm md:text-base leading-relaxed",
                      isSpatialMode
                        ? "text-neutral-300 font-mono"
                        : "text-neutral-600",
                    )}
                  >
                    {selectedProject.solution}
                  </p>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-xl border-l-4",
                    isSpatialMode
                      ? "bg-cyan-950/30 border-cyan-500"
                      : "bg-green-50 border-green-500",
                  )}
                >
                  <h4
                    className={cn(
                      "text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2",
                      isSpatialMode ? "text-cyan-500" : "text-green-700",
                    )}
                  >
                    Result
                  </h4>
                  <p
                    className={cn(
                      "text-sm md:text-base font-medium",
                      isSpatialMode
                        ? "text-cyan-50 font-mono"
                        : "text-green-900",
                    )}
                  >
                    {selectedProject.result}
                  </p>
                </div>
              </div>

              <div className="mt-8 md:mt-10 flex justify-end">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 group text-sm md:text-base",
                    isSpatialMode
                      ? "bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      : "bg-[#1D1D1F] text-white hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-1",
                  )}
                >
                  Visit Deployment{" "}
                  <ExternalLink
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
