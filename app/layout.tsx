"use client";

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { useViewStore } from "@/store/useViewStore";
import { cn } from "@/lib/utils";
import ViewToggle from "@/components/ui/ViewToggle";
import Scene from "@/components/3d/Scene";
import Navbar from "@/components/layout/Navbar";
import CommandPalette from "@/components/ui/CommandPalette";
import BootSequence from "@/components/ui/BootSequence";
import dynamic from "next/dynamic";

const PortfolioUniverse = dynamic(() => import("@/components/PortfolioUniverse"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          inter.className,
          "min-h-screen transition-colors duration-1000 ease-in-out selection:bg-cyan-500/30",
          // The Premium Light Grey for Executive, Deep Obsidian for Spatial OS
          isSpatialMode ? "bg-[#030303] text-white" : "bg-[#F5F5F7] text-[#1D1D1F]"
        )}
      >
        <Scene />
        <ViewToggle />
        <Navbar />
        <CommandPalette />
        <BootSequence />
        <PortfolioUniverse />
        
        <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}