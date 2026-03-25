"use client";

import { useState } from "react";
import { useViewStore } from "@/store/useViewStore";
import GlassPanel from "@/components/ui/GlassPanel";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is the typical timeline for a project?",
    spatialQuestion: "What is the typical timeline for a project?",
    answer: "Most full-stack applications take between 4 to 8 weeks depending on the complexity of the architecture, 3D assets, and required AI integrations."
  },
  {
    question: "Do you provide ongoing support?",
    spatialQuestion: "Do you provide ongoing support?",
    answer: "Yes. I offer retainer packages for ongoing server maintenance, security updates, and feature scaling after the initial launch."
  },
  {
    question: "What is the payment structure?",
    spatialQuestion: "What is the payment structure?",
    answer: "Typically, projects are structured with a 50% initial deposit to commence engineering, 25% at the beta launch, and 25% upon final handoff."
  }
];

export default function FAQ() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24" id="faq">
      <div className="mb-16 text-center">
        <h2 className={cn(
          "text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500",
          isSpatialMode ? "text-white font-mono uppercase" : "text-neutral-900"
        )}>
          {isSpatialMode ? "> COMMON_QUESTIONS" : "Common Questions"}
        </h2>
        <div className={cn(
          "w-20 h-1 mt-4 mx-auto transition-colors duration-500",
          isSpatialMode ? "bg-cyan-500" : "bg-neutral-900"
        )} />
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <GlassPanel key={index} className="p-1 cursor-pointer">
            <div 
              className="p-6 flex items-center justify-between"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                <HelpCircle size={20} className={cn(
                  "transition-colors duration-500",
                  isSpatialMode ? "text-cyan-400" : "text-neutral-400"
                )} />
                <span className={cn(
                  "font-bold transition-colors duration-500",
                  isSpatialMode ? "text-cyan-50 font-mono" : "text-neutral-900"
                )}>
                  {isSpatialMode ? faq.spatialQuestion : faq.question}
                </span>
              </div>
              <ChevronDown size={20} className={cn(
                "transition-transform duration-300",
                openIndex === index ? "rotate-180" : "rotate-0",
                isSpatialMode ? "text-cyan-500" : "text-neutral-500"
              )} />
            </div>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className={cn(
                    "px-6 pb-6 pt-2 text-sm leading-relaxed border-t mt-2",
                    isSpatialMode ? "text-neutral-400 font-mono border-cyan-900/30" : "text-neutral-600 border-neutral-100"
                  )}>
                    {isSpatialMode ? `> DECRYPTED_RES: ${faq.answer}` : faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}