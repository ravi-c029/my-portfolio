"use client";

import { useRef, useState, useEffect } from "react";
import { useViewStore } from "@/store/useViewStore";
import GlassPanel from "@/components/ui/GlassPanel";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { PhoneCall, FileText, PenTool, Code, Rocket, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const processSteps = [
  { step: "01", title: "Discovery Call", spatialTitle: "Discovery Call", description: "Understanding your core problem, target audience, and business objectives.", icon: PhoneCall },
  { step: "02", title: "Proposal & Timeline", spatialTitle: "Proposal & Timeline", description: "Defining the tech stack, project scope, and delivering a precise timeline.", icon: FileText },
  { step: "03", title: "UI/UX & Spatial Design", spatialTitle: "UI/UX & Spatial Design", description: "Creating wireframes and 3D visual concepts before writing a single line of code.", icon: PenTool },
  { step: "04", title: "Development", spatialTitle: "Development", description: "Building the scalable architecture using Next.js, React, and Three.js.", icon: Code },
  { step: "05", title: "Testing & Launch", spatialTitle: "Testing & Launch", description: "Rigorous QA testing for performance and security before the final live push.", icon: Rocket },
  { step: "06", title: "Support & Maintenance", spatialTitle: "Support & Maintenance", description: "Ongoing technical support to ensure your application scales smoothly.", icon: Wrench }
];

export default function Process() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. SCROLL TRACKING FOR ELECTRIC LINE
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth spring physics for the electric flow
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 40,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 relative" id="process">
      <div className="mb-20 px-6 max-w-7xl mx-auto">
        <h2 className={cn(
          "text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500",
          isSpatialMode ? "text-white font-mono uppercase" : "text-neutral-900"
        )}>
          {isSpatialMode ? "> DEVELOPMENT PROCESS" : "Development Process"}
        </h2>
        <div className={cn(
          "w-20 h-1 mt-4 transition-colors duration-500",
          isSpatialMode ? "bg-cyan-500 shadow-[0_0_15px_#06b6d4]" : "bg-neutral-900"
        )} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        
        {/* --- THE ELECTRIC LINE --- */}
        <div className={cn(
          "absolute left-[28px] md:left-[50%] top-0 bottom-0 w-[2px] -translate-x-[50%] transition-colors duration-500",
          isSpatialMode ? "bg-white/5" : "bg-neutral-100"
        )}>
          {/* THE TRAVELING ELECTRIC LIGHT */}
          <motion.div
            style={{ scaleY }}
            className={cn(
              "absolute top-0 left-0 right-0 origin-top z-10",
              isSpatialMode 
                ? "bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-600 shadow-[0_0_20px_#06b6d4,0_0_40px_rgba(6,182,212,0.4)]" 
                : "bg-neutral-800"
            )}
          />
        </div>

        {/* --- THE STEPS --- */}
        <div className="space-y-20 relative z-10">
          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            // Calculate activation threshold for each icon
            const threshold = index / (processSteps.length - 1);

            return (
              <div key={index} className={cn(
                "relative flex items-center md:justify-between",
                isEven ? "md:flex-row-reverse" : "md:flex-row",
                "flex-row"
              )}>
                
                {/* ICON NODE WITH DYNAMIC GLOW */}
                <StepIcon 
                  Icon={step.icon} 
                  isSpatialMode={isSpatialMode} 
                  scrollYProgress={scrollYProgress} 
                  threshold={threshold}
                />

                {/* GlassPanel Content */}
                <div className={cn(
                  "w-full md:w-[45%] pl-16 md:pl-0",
                  isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                )}>
                  <GlassPanel className="p-6 group hover:border-cyan-500/50 transition-all duration-500">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <span className={cn(
                        "text-[10px] font-bold tracking-widest uppercase mb-2 block",
                        isSpatialMode ? "text-cyan-600 font-mono" : "text-neutral-400"
                      )}>
                        {isSpatialMode ? `STEP_${step.step}` : `Phase ${step.step}`}
                      </span>
                      <h3 className={cn(
                        "text-xl font-bold mb-3 transition-colors",
                        isSpatialMode ? "text-cyan-50 font-mono group-hover:text-cyan-400" : "text-neutral-900"
                      )}>
                        {isSpatialMode ? step.spatialTitle : step.title}
                      </h3>
                      <p className={cn(
                        "text-sm leading-relaxed",
                        isSpatialMode ? "text-neutral-400 font-mono text-xs" : "text-neutral-600"
                      )}>
                        {step.description}
                      </p>
                    </motion.div>
                  </GlassPanel>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Sub-component to handle individual Icon activation and glow
function StepIcon({ Icon, isSpatialMode, scrollYProgress, threshold }: any) {
  const [isActive, setIsActive] = useState(false);

  // Update activation state based on scroll
  useEffect(() => {
    return scrollYProgress.onChange((v: number) => {
      // 0.05 offset to trigger slightly before the line reaches exactly
      setIsActive(v >= threshold - 0.05);
    });
  }, [scrollYProgress, threshold]);

  return (
    <motion.div 
      className={cn(
        "absolute left-0 md:left-[50%] -translate-x-[50%] w-14 h-14 rounded-full flex items-center justify-center z-20 transition-all duration-700",
        isActive 
          ? (isSpatialMode ? "bg-cyan-500 border-cyan-300 shadow-[0_0_30px_#06b6d4]" : "bg-neutral-900 border-black shadow-lg")
          : (isSpatialMode ? "bg-black border border-white/10 text-neutral-700" : "bg-white border border-neutral-200 text-neutral-400")
      )}
    >
      <Icon size={22} className={cn(
        "transition-colors duration-500 relative z-30",
        isActive ? (isSpatialMode ? "text-black" : "text-white") : "inherit"
      )} />

      {/* Pulsing Aura when Active (Spatial Mode Only) */}
      {isActive && isSpatialMode && (
        <motion.div 
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-cyan-500/50 pointer-events-none"
        />
      )}
    </motion.div>
  );
}