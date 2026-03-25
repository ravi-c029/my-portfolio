"use client";

import { useViewStore } from "@/store/useViewStore";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = {
  navigation: [
    { name: "Home", href: "#home" }, // Updated href for smooth scroll
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
  ],
  projects: [
    { name: "Cinematic App Storyteller", href: "#" },
    { name: "CivicRise India", href: "https://civic-rise-india.tech/" },
    { name: "Core-Connect", href: "https://coreconnect.site/" },
    { name: "Medical Agency", href: "https://www.ravimedical.in/" },
  ],
  socials: [
    { name: "GitHub", href: "https://github.com/ravi-c029", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ravi-kumar-keshari-a37828347", icon: Linkedin },
    { name: "Twitter", href: "https://x.com/ravi_c029", icon: Twitter },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "Instagram", href: "https://www.instagram.com/ravi_c029/", icon: Instagram },
  ],
};

export default function Footer() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  // Smooth scroll logic for footer links (consistent with Navbar)
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          const offsetTop = elem.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <footer
      className={cn(
        "relative pt-16 md:pt-24 pb-8 md:pb-12 border-t transition-colors duration-700 overflow-hidden",
        isSpatialMode
          ? "bg-[#030303] border-cyan-500/10"
          : "bg-white border-neutral-200",
      )}
    >
      {/* Subtle Background Glow for Spatial Mode */}
      {isSpatialMode && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] md:h-[300px] bg-cyan-500/5 blur-[80px] md:blur-[120px] pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* FIX: grid-cols-1 for mobile ensures columns stack vertically */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 transition-all duration-500 shrink-0",
                  isSpatialMode
                    ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    : "border-neutral-800 shadow-md",
                )}
              >
                <img
                  src="/ravi-profile.jpg"
                  alt="Ravi Kumar Keshari"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>

              <span
                className={cn(
                  "text-lg md:text-xl font-bold tracking-tight leading-tight",
                  isSpatialMode && "font-mono uppercase text-white",
                )}
              >
                Ravi Kumar <br /> Keshari
              </span>
            </div>

            <p
              className={cn(
                "text-sm leading-relaxed",
                isSpatialMode ? "text-neutral-500 font-mono text-xs md:text-sm" : "text-neutral-500",
              )}
            >
              Full-Stack Engineer & Video Editor. Building production-level web
              experiences at IIT Patna.
            </p>

            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase",
                  isSpatialMode ? "text-cyan-600" : "text-neutral-400",
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Global Status: Online
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4
              className={cn(
                "text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6",
                isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
              )}
            >
              Navigation
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className={cn(
                      "text-sm transition-all flex items-center gap-1 group py-1 md:py-0", // Added py-1 for better mobile tap target
                      isSpatialMode
                        ? "text-neutral-500 hover:text-cyan-400 font-mono"
                        : "text-neutral-500 hover:text-black",
                    )}
                  >
                    {link.name}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-y-1 transition-all"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Works */}
          <div>
            <h4
              className={cn(
                "text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6",
                isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
              )}
            >
              Featured Works
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-sm transition-all group flex items-center gap-1 py-1 md:py-0 line-clamp-1", // Prevent long names from breaking layout
                      isSpatialMode
                        ? "text-neutral-500 hover:text-cyan-400 font-mono"
                        : "text-neutral-500 hover:text-black",
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Connect */}
          <div>
            <h4
              className={cn(
                "text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6",
                isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
              )}
            >
              Connect
            </h4>
            {/* Social Icons - Wrap nicely on mobile */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              {footerLinks.socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }} // Added tap effect for mobile
                  className={cn(
                    "w-10 h-10 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all",
                    isSpatialMode
                      ? "bg-cyan-950/30 border border-cyan-900/50 text-cyan-400 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "bg-neutral-100 border border-neutral-200 text-neutral-600 hover:bg-black hover:text-white",
                  )}
                  title={social.name}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            
            <div className="mt-6 md:mt-8">
              <p
                className={cn(
                  "text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-1.5 md:mb-2",
                  isSpatialMode
                    ? "text-cyan-800 font-mono"
                    : "text-neutral-400",
                )}
              >
                Primary Comms
              </p>
              <a
                href="mailto:ravi.keshari029@gmail.com"
                className={cn(
                  "text-sm md:text-sm font-bold break-all", // break-all ensures long email doesn't overflow screen
                  isSpatialMode ? "text-cyan-500 font-mono" : "text-black",
                )}
              >
                ravi.keshari029@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={cn(
            "pt-6 md:pt-8 border-t flex flex-col md:flex-row items-center md:items-center justify-between gap-4 md:gap-6 text-center md:text-left",
            isSpatialMode ? "border-cyan-500/10" : "border-neutral-100",
          )}
        >
          <p
            className={cn(
              "text-[10px] md:text-xs tracking-widest uppercase order-2 md:order-1", // copyright moves to bottom on mobile
              isSpatialMode ? "text-neutral-600 font-mono" : "text-neutral-400",
            )}
          >
            © 2026 All rights reserved _ 24a12res1050@iitp
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 order-1 md:order-2">
            {[
              { name: "Privacy Policy", slug: "/privacy" },
              { name: "Terms & Conditions", slug: "/terms" },
              { name: "Refund Policy", slug: "/refund" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.slug}
                className={cn(
                  "text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors",
                  isSpatialMode
                    ? "text-neutral-500 hover:text-cyan-500 font-mono"
                    : "text-neutral-400 hover:text-black",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}