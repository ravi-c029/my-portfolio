"use client";

import { useRef, useState, useEffect } from "react";
import { useViewStore } from "@/store/useViewStore";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data based on your projects
const testimonials = [
  {
    quote:
      "Centralized our scattered PDFs and meeting links into one platform. It drastically reduced the time students spent searching for materials.",
    name: "Core-Connect Admin",
    role: "Academic Cohort",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&h=150&q=80", // Young student/admin type
  },
  {
    quote:
      "The PWA completely streamlined our reporting pipeline. Citizens can now log issues effortlessly, and we are tracking civic resolutions in real-time.",
    name: "Platform Manager",
    role: "CivicRise India",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", // Civic tech manager type
  },
  {
    quote:
      "The autonomous agent for generating app trailers is brilliant. It saved us countless hours of video editing and reduced our marketing pipeline costs.",
    name: "Startup Founder",
    role: "Tech Client",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", // Startup founder type
  },
  {
    quote:
      "Our inventory and visitor tracking is finally digital. The owner dashboard gives us complete control over our medical agency operations.",
    name: "Agency Owner",
    role: "Ravi Medical Agency",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", // Civic tech manager type
  },
];

// Duplicate for infinite scroll loop
const duplicatedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

function TestimonialCard({
  testimonial,
  isSpatialMode,
}: {
  testimonial: any;
  isSpatialMode: boolean;
}) {
  return (
    <motion.div
      // Disabled hover lift on mobile to prevent accidental jerks while scrolling
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative w-[300px] md:w-[420px] shrink-0 p-6 md:p-8 rounded-3xl flex flex-col justify-between transition-all duration-500",
        isSpatialMode
          ? "bg-black/60 border border-cyan-900/40 hover:border-cyan-500/60 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          : "bg-white border border-[#E5E5EA] shadow-sm hover:shadow-xl hover:border-neutral-300",
      )}
    >
      {/* Large Quote Icon Background */}
      <div
        className={cn(
          "absolute top-6 right-6 opacity-10",
          isSpatialMode ? "text-cyan-500" : "text-neutral-400",
        )}
      >
        <Quote className="w-10 h-10 md:w-16 md:h-16" />
      </div>

      <p
        className={cn(
          "relative z-10 text-sm md:text-lg leading-relaxed mb-6 md:mb-8",
          isSpatialMode
            ? "text-neutral-300 font-mono text-xs md:text-sm"
            : "text-neutral-700",
        )}
      >
        "{testimonial.quote}"
      </p>

      <div className="relative z-10 flex items-center gap-3 md:gap-4 mt-auto">
        <div className="relative z-10 flex items-center gap-3 md:gap-4 mt-auto">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 transition-colors",
              isSpatialMode ? "border-cyan-800" : "border-[#E5E5EA]",
            )}
          />
        </div>
        <div>
          <h4
            className={cn(
              "font-bold text-sm md:text-base",
              isSpatialMode ? "text-cyan-50 font-mono" : "text-[#1D1D1F]",
            )}
          >
            {testimonial.name}
          </h4>
          <p
            className={cn(
              "text-[10px] md:text-sm",
              isSpatialMode ? "text-cyan-600 font-mono" : "text-neutral-500",
            )}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringArea, setIsHoveringArea] = useState(false);
  const scrollX = useMotionValue(0);

  // Detect Mobile Screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- THE BULLETPROOF AUTO-SCROLL LOGIC ---
  useAnimationFrame((t, delta) => {
    if (isMobile || isHoveringArea) {
      let currentX = scrollX.get();

      const speedMultiplier = isMobile ? 0.05 : 0.1;
      currentX -= delta * speedMultiplier;

      const loopWidth = isMobile ? 1296 : 1776;

      if (currentX <= -loopWidth) {
        currentX = 0;
      }
      scrollX.set(currentX);
    }
  });

  return (
    <section className="py-24" id="testimonials">
      {/* FIX: Header Section Reverted to Left-Aligned like Services */}
      <div className="mb-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <h2
            className={cn(
              "text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-500",
              isSpatialMode
                ? "text-white font-mono uppercase"
                : "text-[#1D1D1F]",
            )}
          >
            {isSpatialMode ? "> TESTIMONIALS" : "Testimonials"}
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

        {/* Helper text shifted to the right on desktop */}
        <div
          className={cn(
            "flex items-center gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest",
            isSpatialMode ? "text-cyan-500 font-mono" : "text-neutral-400",
          )}
        >
          {isMobile ? "Live Stream Active" : "Hover to scroll"}
        </div>
      </div>

      {/* --- SCROLLING ROW CONTAINER --- */}
      <div className="w-full relative overflow-hidden">
        <div
          className="relative w-full py-8 pointer-events-none md:pointer-events-auto"
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
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                isSpatialMode={isSpatialMode}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
