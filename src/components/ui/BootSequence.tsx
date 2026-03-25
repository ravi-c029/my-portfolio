"use client";

import { useEffect, useState } from "react";
import { useViewStore } from "@/store/useViewStore";
import { motion, AnimatePresence } from "framer-motion";

export default function BootSequence() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);
  const [isBooting, setIsBooting] = useState(false);

  useEffect(() => {
    if (isSpatialMode) {
      setIsBooting(true);

      const timer = setTimeout(() => {
        setIsBooting(false);
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [isSpatialMode]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(15px)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden"
        >
          {/* --- 1. SUPERCHARGED FLUID AMBIENT GLOWS --- */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-[100px] mix-blend-screen"
            />
            <motion.div
              animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.5, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
            />
          </div>

          {/* --- 2. RADIOACTIVE CYBER PARTICLES --- */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-cyan-300"
                style={{
                  width: `${(i % 3) + 2}px`,
                  height: `${(i % 3) + 2}px`,
                  left: `${(i * 13) % 100}%`,
                  top: `${(i * 17) % 100}%`,
                  boxShadow: "0 0 15px 3px rgba(6, 182, 212, 0.9)",
                }}
                animate={{
                  y: [0, -150],
                  x: [0, i % 2 === 0 ? 30 : -30],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: (i % 3) + 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: (i % 5) * 0.2,
                }}
              />
            ))}
          </div>

          {/* --- 3. THE SOLID QUANTUM CORE (UPDATED) --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90 z-20">
            {/* Outer Solid Glass Cube */}
            <motion.div
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: [0, 180],
              }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              className="absolute w-56 h-56 bg-gradient-to-tr from-cyan-900/40 to-cyan-400/10 backdrop-blur-md border-[2px] border-cyan-400 shadow-[0_0_80px_rgba(6,182,212,0.4),inset_0_0_40px_rgba(6,182,212,0.6)] rounded-3xl"
              style={{ transformStyle: "preserve-3d" }}
            />

            {/* Inner Solid Glass Diamond */}
            <motion.div
              animate={{
                rotateX: [360, 0],
                rotateY: [0, 360],
                rotateZ: [360, 0],
              }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="absolute w-36 h-36 bg-cyan-800/60 backdrop-blur-xl border-[2px] border-cyan-200 shadow-[0_0_50px_rgba(165,243,252,0.5),inset_0_0_30px_rgba(165,243,252,0.8)] rounded-xl"
              style={{ transformStyle: "preserve-3d" }}
            />

            {/* Solid White-Hot Plasma Core (Completely Solid) */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotateZ: [0, 90, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute w-16 h-16 bg-white rounded-lg shadow-[0_0_100px_rgba(255,255,255,1),0_0_60px_rgba(6,182,212,1)]"
            />
          </div>

          {/* --- 4. NEON TERMINAL TEXT --- */}
          <div className="relative z-30 font-mono text-cyan-400 text-xs md:text-sm flex flex-col items-center text-center space-y-2 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              &gt; INITIALIZING SPATIAL_OS KERNEL...
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              &gt; BYPASSING SECURITY PROTOCOLS...
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              &gt; LOADING NEURAL INTERFACE...
            </motion.div>

            {/* Final Flash Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, type: "spring" }}
              className="mt-8 text-2xl md:text-4xl font-black text-white tracking-[0.3em] drop-shadow-[0_0_25px_rgba(255,255,255,1)] pt-4"
            >
              ACCESS GRANTED
            </motion.div>
          </div>

          {/* --- 5. Hacker Scanline/Noise Overlay --- */}
          <div
            className="absolute inset-0 pointer-events-none bg-black opacity-30 z-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
