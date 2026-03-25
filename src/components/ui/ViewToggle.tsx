"use client";
import { useEffect } from "react";
import { useViewStore } from "@/store/useViewStore";
import { motion } from "framer-motion";
import { Monitor, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ViewToggle() {
  const { isSpatialMode, toggleView } = useViewStore();

  useEffect(() => {
    if (isSpatialMode) {
      document.documentElement.classList.add("spatial-mode");
    } else {
      document.documentElement.classList.remove("spatial-mode");
    }
  }, [isSpatialMode]);

  return (
    // FIX: Adjusted top/right spacing for mobile, increased z-index so it's always clickable
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[150] flex items-center gap-2 md:gap-3">
      {/* FIX: Hidden on extra small screens to save space, visible on sm and up */}
      <span
        className={cn(
          "hidden sm:block text-[10px] md:text-xs font-mono tracking-widest uppercase transition-colors duration-500",
          isSpatialMode ? "text-cyan-400" : "text-neutral-500",
        )}
      >
        {isSpatialMode ? "Magical View" : "Standard View"}
      </span>

      <button
        onClick={toggleView}
        className={cn(
          "relative flex items-center rounded-full transition-colors duration-500 border p-1",
          // FIX: Responsive width and height for the toggle container
          "h-8 w-14 md:h-10 md:w-20",
          // FIX: Used justify-end / justify-start instead of margin-left for bulletproof responsiveness
          isSpatialMode
            ? "bg-neutral-900 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] justify-end"
            : "bg-white border-neutral-200 shadow-sm justify-start",
        )}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className={cn(
            "flex items-center justify-center rounded-full shrink-0",
            // FIX: Responsive knob size
            "h-6 w-6 md:h-8 md:w-8",
            isSpatialMode ? "bg-cyan-500 text-black" : "bg-black text-white",
          )}
        >
          {isSpatialMode ? (
            <Cpu className="w-3 h-3 md:w-4 md:h-4" />
          ) : (
            <Monitor className="w-3 h-3 md:w-4 md:h-4" />
          )}
        </motion.div>
      </button>
    </div>
  );
}
