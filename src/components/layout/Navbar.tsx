"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useViewStore } from "@/store/useViewStore";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, FolderGit2, Mail, Terminal } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home", icon: Home, spatialName: "Home" },
  { name: "About", href: "#about", icon: User, spatialName: "About" },
  { name: "Services", href: "#services", icon: Briefcase, spatialName: "Services" },
  { name: "Projects", href: "#portfolio", icon: FolderGit2, spatialName: "Projects" },
  { name: "Testimonials", href: "#testimonials", icon: User, spatialName: "Testimonials" },
  { name: "Work Flow", href: "#process", icon: User, spatialName: "Process" },
  { name: "FAQs", href: "#faq", icon: User, spatialName: "FAQs" },
  { name: "Contact", href: "#contact", icon: Mail, spatialName: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- THE BULLETPROOF SCROLL LOGIC ---
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    e.stopPropagation(); // Parent onClick ko trigger hone se roko

    // 1. Menu ko turant band karo
    if (isMobile) {
      setIsOpen(false); 
    }

    // 2. 150ms ka magic delay do! (Mobile processors ko saans lene ka time)
    setTimeout(() => {
      const targetId = href.replace("#", "");
      
      if (href === "#home" || href === "#") {
          window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
          const elem = document.getElementById(targetId);
          if (elem) {
              // 80px ka offset taaki Navbar heading ko na chhupaye
              const offsetTop = elem.getBoundingClientRect().top + window.scrollY - 80; 
              window.scrollTo({
                  top: offsetTop,
                  behavior: "smooth"
              });
          }
      }
    }, 150); // 👈 Ye 150ms ka delay hi mobile pe magic karega
  };

  return (
    <div 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-start justify-center pt-2 px-4"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <motion.nav
        layout
        onClick={() => isMobile && setIsOpen(!isOpen)}
        initial={{ borderRadius: 32 }}
        animate={{
          width: isOpen ? (isMobile ? 240 : "auto") : 140, // Mobile width thodi badha di for better tapping
          height: isOpen ? (isMobile ? "auto" : 64) : 48,
          borderRadius: 32,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        }}
        className={cn(
          "overflow-hidden flex items-center shadow-2xl backdrop-blur-xl border cursor-pointer md:cursor-default",
          isOpen && isMobile ? "flex-col items-start" : "justify-center",
          isSpatialMode 
            ? "bg-black/60 border-cyan-500/30 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)]" 
            : "bg-white/90 border-[#E5E5EA] text-[#1D1D1F] shadow-black/5"
        )}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 font-medium justify-center w-full h-full"
            >
              {isSpatialMode ? (
                <>
                  <Terminal size={18} className="text-cyan-500" />
                  <span className="font-mono text-sm tracking-wider">Menu</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-[#1D1D1F] animate-pulse" />
                  <span className="text-sm tracking-wide">Menu</span>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-1 px-4 py-6 md:py-0 w-full"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  // FIX: Mobile pe links ko touch karna aasan banane ke liye py-3 aur w-full add kiya
                  className={cn(
                    "relative flex items-center gap-3 md:gap-2 px-4 py-3 md:py-2 w-full md:w-auto rounded-2xl md:rounded-full transition-colors group active:scale-95",
                    isSpatialMode 
                      ? "hover:bg-cyan-500/20 active:bg-cyan-500/30" 
                      : "hover:bg-[#F5F5F7] active:bg-[#E5E5EA]"
                  )}
                >
                  <link.icon size={18} className={cn(
                    "transition-colors",
                    isSpatialMode ? "text-cyan-600 group-hover:text-cyan-400" : "text-neutral-400 group-hover:text-[#1D1D1F]"
                  )} />
                  <span className={cn(
                    "text-base md:text-sm font-medium", // Mobile pe text thoda bada kiya
                    isSpatialMode ? "font-mono text-cyan-50" : "text-neutral-600 group-hover:text-[#1D1D1F]"
                  )}>
                    {isSpatialMode ? link.spatialName : link.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
