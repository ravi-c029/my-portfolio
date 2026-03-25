"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Github,
  Mail,
  FileText,
  Layout,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Palette */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-white/5">
            <Search className="text-neutral-500 mr-3" size={18} />
            <input
              autoFocus
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none text-white focus:outline-none py-2 text-sm font-mono"
            />
          </div>

          <div className="p-2">
            {[
              // 1. Array mein 'href' add kiya
              {
                icon: Layout,
                label: "View Portfolio",
                shortcut: "V P",
                href: "#portfolio",
              },
              {
                icon: FileText,
                label: "Download Resume",
                shortcut: "D R",
                href: "https://jruxzkmkiodultnhljca.supabase.co/storage/v1/object/public/resume/firmware_v1771342105062.pdf",
              }, // Apne public folder me resume.pdf daal dena
              {
                icon: Github,
                label: "Visit GitHub",
                shortcut: "G H",
                href: "https://github.com/ravi-c029",
              },
              {
                icon: Mail,
                label: "Contact Me",
                shortcut: "C M",
                href: "mailto:ravi.keshari029@gmail.com",
              },
            ].map((item, i) => (
              // 2. <button> ko <a> tag se replace kiya
              <a
                key={i}
                href={item.href}
                // Agar external link (http) hai toh naye tab me open hoga, warna same tab me
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={16}
                    className="text-neutral-500 group-hover:text-cyan-400 transition-colors"
                  />
                  <span className="text-sm text-neutral-400 font-mono group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 font-mono bg-white/5 px-2 py-1 rounded">
                  {item.shortcut}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
