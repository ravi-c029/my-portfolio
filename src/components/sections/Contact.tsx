"use client";

import { useState, useEffect } from "react";
import { useViewStore } from "@/store/useViewStore";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, ArrowUpRight, Zap, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// PUT YOUR ACTUAL LINKS HERE
const CALENDLY_URL = "https://calendly.com/"; // Replace with your link
const EMAIL_ADDRESS = "ravi.keshari029@gmail.com";

export default function Contact() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock background scroll when modal is open & add Escape key listener
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsModalOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="contact">
      {/* Background Aesthetic */}
      {isSpatialMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] mb-6 md:mb-8 border",
            isSpatialMode ? "bg-cyan-950/30 border-cyan-500/30 text-cyan-400" : "bg-neutral-100 border-neutral-200 text-neutral-500"
          )}
        >
          <Zap size={12} className={isSpatialMode ? "animate-pulse" : ""} />
          {isSpatialMode ? "SYSTEM_READY // INITIATE_COMMS" : "Ready to start?"}
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1]",
            isSpatialMode ? "text-white font-mono uppercase" : "text-[#1D1D1F]"
          )}
        >
          Let's Build Something <br className="hidden sm:block" />
          <span className={cn(
            "transition-colors duration-500",
            isSpatialMode ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "text-neutral-400"
          )}>
            Powerful Together.
          </span>
        </motion.h2>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12">
          {/* Email Button */}
          <motion.a
            href={`mailto:${EMAIL_ADDRESS}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "group flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 w-full sm:w-auto text-sm md:text-base",
              isSpatialMode ? "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]" : "bg-[#1D1D1F] text-white hover:bg-neutral-800 shadow-xl"
            )}
          >
            <Mail size={18} />
            <span className="truncate max-w-[200px] md:max-w-none">{EMAIL_ADDRESS}</span>
            <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all hidden md:block" />
          </motion.a>

          {/* Schedule Button (Opens Modal) */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "group flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 border w-full sm:w-auto text-sm md:text-base",
              isSpatialMode ? "bg-transparent border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10" : "bg-white border-neutral-200 text-[#1D1D1F] hover:bg-neutral-50"
            )}
          >
            <Calendar size={18} />
            Schedule a Call
          </motion.button>
        </div>

        {/* Footer info (Minimal) */}
        <div className="mt-20 md:mt-32 opacity-30 text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase">
          {isSpatialMode ? "© 2026 // RAVI_KUMAR_KESHARI // IIT_PATNA" : "© 2026 Ravi Kumar Keshari"}
        </div>
      </div>

      {/* --- THE BOOKING MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl custom-scrollbar",
                isSpatialMode ? "bg-[#050505] border border-cyan-500/30" : "bg-white border border-neutral-200"
              )}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)} 
                className={cn(
                  "absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full transition-colors z-10",
                  isSpatialMode ? "hover:bg-cyan-900/50" : "hover:bg-neutral-100"
                )}
              >
                <X size={20} className={isSpatialMode ? "text-cyan-500" : "text-neutral-400"} />
              </button>

              <div className="mb-6 md:mb-8 mt-2 md:mt-0">
                <div className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4",
                  isSpatialMode ? "bg-cyan-950/50 text-cyan-400 border border-cyan-800" : "bg-neutral-100 text-black"
                )}>
                  <Clock size={20} className="md:w-6 md:h-6" />
                </div>
                <h3 className={cn("text-xl md:text-2xl font-bold", isSpatialMode ? "text-white font-mono" : "text-black")}>
                  Book a Discovery Session
                </h3>
                <p className="text-neutral-500 text-xs md:text-sm mt-1.5 md:mt-2">
                  Pick a way to connect and discuss your project.
                </p>
              </div>

              {/* Functional Interaction Options */}
              <div className="space-y-3 md:space-y-4">
                
                {/* Email Link */}
                <a 
                  href={`mailto:${EMAIL_ADDRESS}?subject=Project Inquiry`}
                  className={cn(
                    "w-full p-4 md:p-6 rounded-xl md:rounded-2xl flex items-center justify-between transition-all group",
                    isSpatialMode ? "bg-cyan-950/20 border border-cyan-900/50 hover:border-cyan-500" : "bg-neutral-50 border border-neutral-200 hover:border-black"
                  )}
                >
                  <div className="flex items-center gap-3 md:gap-4 text-left">
                    <div className="p-2.5 md:p-3 bg-white/5 rounded-lg md:rounded-xl shrink-0">
                      <Mail size={18} className="md:w-5 md:h-5 text-current" />
                    </div>
                    <div>
                      <p className={cn("font-bold text-sm md:text-base", isSpatialMode && "text-white font-mono")}>Send a Brief</p>
                      <p className="text-[10px] md:text-xs text-neutral-500 mt-0.5">I'll respond within 12 hours</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-current" />
                </a>

                {/* Calendly Link */}
                <a 
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full p-4 md:p-6 rounded-xl md:rounded-2xl flex items-center justify-between transition-all group",
                    isSpatialMode ? "bg-cyan-950/20 border border-cyan-900/50 hover:border-cyan-500" : "bg-neutral-50 border border-neutral-200 hover:border-black"
                  )}
                >
                  <div className="flex items-center gap-3 md:gap-4 text-left">
                    <div className="p-2.5 md:p-3 bg-white/5 rounded-lg md:rounded-xl shrink-0">
                      <Calendar size={18} className="md:w-5 md:h-5 text-current" />
                    </div>
                    <div>
                      <p className={cn("font-bold text-sm md:text-base", isSpatialMode && "text-white font-mono")}>Calendly Link</p>
                      <p className="text-[10px] md:text-xs text-neutral-500 mt-0.5">Instant calendar booking</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-current" />
                </a>

              </div>

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-neutral-200/10 text-center">
                <p className={cn("text-[8px] md:text-[10px] font-bold tracking-widest uppercase", isSpatialMode ? "text-cyan-700 font-mono" : "text-neutral-400")}>
                  Available Time: Mon - Fri // 10:00 - 18:00
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}