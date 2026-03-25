"use client";

import { useViewStore } from "@/store/useViewStore";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

export default function GlassPanel({ children, className }: { children: ReactNode; className?: string }) {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  // Advanced Mouse Tracking for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isSpatialMode) return; // Only tilt in Spatial Mode
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={isSpatialMode ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      className={cn(
        "glass-panel relative w-full rounded-2xl transition-all duration-500 ease-out overflow-hidden group", // <-- Added "glass-panel" at the start
        isSpatialMode 
          ? "bg-black/30 backdrop-blur-2xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] p-8 md:p-12" 
          : "bg-white border border-neutral-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 p-8 md:p-12",
        className
      )}
    >
      {/* Glare effect on hover for Spatial OS */}
      {isSpatialMode && (
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(10px)" }} />
      )}
      
      <div className="relative z-10" style={isSpatialMode ? { transform: "translateZ(30px)" } : {}}>
        {children}
      </div>
    </motion.div>
  );
}