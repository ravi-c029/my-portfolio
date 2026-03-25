// "use client";

// import { useViewStore } from "@/store/useViewStore";
// import { motion } from "framer-motion";
// import { Layers, Code2, Target, User, Cpu, Globe } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function About() {
//   const isSpatialMode = useViewStore((state) => state.isSpatialMode);

//   const aboutContent = (
//     <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
//       {/* Left Column: 3 Interconnected Image Nodes & Stats */}
//       <div className="w-full lg:w-5/12 space-y-12">
//         {/* --- 3 INTERCONNECTED CIRCULAR NODES --- */}
//         <div className="relative w-full aspect-square max-w-[380px] mx-auto lg:mx-0">
//           {/* Spatial Mode Connecting Lines (Neural Network vibe) */}
//           {isSpatialMode && (
//             <svg className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none">
//               <line
//                 x1="35%"
//                 y1="35%"
//                 x2="70%"
//                 y2="70%"
//                 stroke="#06b6d4"
//                 strokeWidth="2"
//                 strokeDasharray="4 4"
//               />
//               <line
//                 x1="35%"
//                 y1="35%"
//                 x2="80%"
//                 y2="25%"
//                 stroke="#06b6d4"
//                 strokeWidth="2"
//                 strokeDasharray="4 4"
//               />
//             </svg>
//           )}

//           {/* Node 1: Main Founder Image (Large) */}
//           <motion.div
//             animate={{ y: [-6, 6, -6] }}
//             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//             className={cn(
//               "absolute top-[5%] left-[5%] w-[65%] aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-500 z-10 overflow-hidden group",
//               isSpatialMode
//                 ? "bg-black/80 border border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
//                 : "bg-white border-8 border-[#F5F5F7] shadow-xl", // Thick border creates the cutout overlap effect in light mode
//             )}
//           >
//             <User
//               className={cn(
//                 "w-10 h-10 mb-2 opacity-50",
//                 isSpatialMode ? "text-cyan-400" : "text-neutral-400",
//               )}
//             />
//             <span
//               className={cn(
//                 "text-[10px] font-mono",
//                 isSpatialMode ? "text-cyan-600" : "text-neutral-400",
//               )}
//             >
//               FOUNDER.JPG
//             </span>
//           </motion.div>

//           {/* Node 2: Setup/Code Image (Medium) */}
//           <motion.div
//             animate={{ y: [4, -4, 4] }}
//             transition={{
//               duration: 5,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: 1,
//             }}
//             className={cn(
//               "absolute bottom-[5%] right-[5%] w-[50%] aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-500 z-20 overflow-hidden",
//               isSpatialMode
//                 ? "bg-black/90 border border-cyan-700 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
//                 : "bg-neutral-100 border-8 border-[#F5F5F7] shadow-lg",
//             )}
//           >
//             <Cpu
//               className={cn(
//                 "w-8 h-8 mb-1 opacity-50",
//                 isSpatialMode ? "text-cyan-500" : "text-neutral-500",
//               )}
//             />
//             <span
//               className={cn(
//                 "text-[9px] font-mono",
//                 isSpatialMode ? "text-cyan-700" : "text-neutral-500",
//               )}
//             >
//               SETUP.JPG
//             </span>
//           </motion.div>

//           {/* Node 3: Aesthetic/Abstract (Small) */}
//           <motion.div
//             animate={{ y: [-3, 3, -3] }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: 2,
//             }}
//             className={cn(
//               "absolute top-[10%] right-[0%] w-[35%] aspect-square rounded-full flex flex-col items-center justify-center transition-all duration-500 z-0 overflow-hidden",
//               isSpatialMode
//                 ? "bg-cyan-950/50 border border-cyan-900 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
//                 : "bg-neutral-200 border-4 border-[#F5F5F7] shadow-md",
//             )}
//           >
//             <Globe
//               className={cn(
//                 "w-6 h-6 opacity-40",
//                 isSpatialMode ? "text-cyan-600" : "text-neutral-400",
//               )}
//             />
//           </motion.div>
//         </div>
//         {/* --- END INTERCONNECTED NODES --- */}

//         {/* Stats Grid (Moved down slightly to balance the circles) */}
//         <div className="grid grid-cols-2 gap-4">
//           <div
//             className={cn(
//               "p-6 rounded-2xl transition-all duration-500",
//               isSpatialMode
//                 ? "bg-black/40 border border-cyan-900/50"
//                 : "bg-white border border-neutral-200/60 shadow-sm hover:shadow-md",
//             )}
//           >
//             <Layers
//               className={cn(
//                 "mb-3",
//                 isSpatialMode ? "text-cyan-400" : "text-[#1D1D1F]",
//               )}
//               size={24}
//             />
//             <div
//               className={cn(
//                 "text-3xl font-bold mb-1",
//                 isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
//               )}
//             >
//               5+
//             </div>
//             <div
//               className={cn(
//                 "text-xs uppercase tracking-wider",
//                 isSpatialMode ? "text-cyan-600 font-mono" : "text-neutral-500",
//               )}
//             >
//               Completed Projects
//             </div>
//           </div>
//           <div
//             className={cn(
//               "p-6 rounded-2xl transition-all duration-500",
//               isSpatialMode
//                 ? "bg-black/40 border border-cyan-900/50"
//                 : "bg-white border border-neutral-200/60 shadow-sm hover:shadow-md",
//             )}
//           >
//             <Code2
//               className={cn(
//                 "mb-3",
//                 isSpatialMode ? "text-cyan-400" : "text-[#1D1D1F]",
//               )}
//               size={24}
//             />
//             <div
//               className={cn(
//                 "text-3xl font-bold mb-1",
//                 isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
//               )}
//             >
//               1+ Yrs
//             </div>
//             <div
//               className={cn(
//                 "text-xs uppercase tracking-wider",
//                 isSpatialMode ? "text-cyan-600 font-mono" : "text-neutral-500",
//               )}
//             >
//               Engineering Exp.
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Column: Text Content */}
//       <div className="w-full lg:w-7/12 flex flex-col justify-center pt-4 lg:pt-8">
//         <h2
//           className={cn(
//             "text-4xl md:text-5xl font-bold tracking-tight mb-8 transition-colors duration-500",
//             isSpatialMode ? "text-white font-mono uppercase" : "text-[#1D1D1F]",
//           )}
//         >
//           {isSpatialMode ? "> SYSTEM_ARCHITECT" : "About the Founder"}
//         </h2>

//         <div
//           className={cn(
//             "space-y-6 text-lg leading-relaxed transition-colors duration-500",
//             isSpatialMode
//               ? "text-neutral-300 font-mono text-sm"
//               : "text-neutral-600",
//           )}
//         >
//           {isSpatialMode && (
//             <div className="text-cyan-500 mb-4">// INITIALIZATION_SEQUENCE</div>
//           )}

//           <p>
//             My journey into development started with a simple fascination for
//             how things are built. As a Computer Science and Engineering student
//             at IIT Patna, I quickly realized that writing functional code wasn't
//             enough. The real impact happens when complex engineering meets
//             flawless, cinematic design.
//           </p>
//           <p>
//             By combining my background in video editing with advanced web
//             technologies like Next.js, React, and Three.js, I don't just build
//             websites. I engineer digital environments. From developing civic
//             engagement platforms like CivicRise India to building comprehensive
//             management tools like Core-Connect, my focus has always been on
//             solving real-world problems through robust, scalable code.
//           </p>
//         </div>

//         {/* Mission Box */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           whileHover={{
//             scale: 1.02,
//             x: 8, // Slight nudge to the right
//             transition: { type: "spring", stiffness: 300, damping: 20 },
//           }}
//           className={cn(
//             "mt-10 p-8 rounded-2xl border-l-4 transition-all duration-500 group cursor-default relative overflow-hidden",
//             isSpatialMode
//               ? "bg-cyan-950/20 border-cyan-500 text-cyan-50 hover:bg-cyan-900/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:border-cyan-400"
//               : "bg-white shadow-md border-[#1D1D1F] text-[#1D1D1F] hover:shadow-2xl hover:border-neutral-600",
//           )}
//         >
//           {/* Subtle background gradient on hover */}
//           <div
//             className={cn(
//               "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
//               isSpatialMode
//                 ? "bg-gradient-to-r from-cyan-500/10 to-transparent"
//                 : "bg-gradient-to-r from-neutral-100 to-transparent",
//             )}
//           />

//           <div className="relative z-10 flex items-center gap-3 mb-4">
//             <Target
//               className={cn(
//                 "transition-all duration-500 group-hover:rotate-90 group-hover:scale-110", // Target icon rotates and scales on hover
//                 isSpatialMode
//                   ? "text-cyan-400 group-hover:text-cyan-300"
//                   : "text-[#1D1D1F] group-hover:text-neutral-700",
//               )}
//               size={24}
//             />
//             <h3
//               className={cn(
//                 "text-xl font-bold transition-colors duration-300",
//                 isSpatialMode
//                   ? "font-mono uppercase group-hover:text-cyan-300"
//                   : "group-hover:text-neutral-800",
//               )}
//             >
//               {isSpatialMode ? "EXECUTE: MISSION" : "My Mission"}
//             </h3>
//           </div>
//           <p
//             className={cn(
//               "italic leading-relaxed relative z-10 transition-colors duration-300",
//               isSpatialMode
//                 ? "text-cyan-200/80 font-mono text-sm group-hover:text-cyan-100"
//                 : "text-neutral-600 group-hover:text-neutral-900",
//             )}
//           >
//             "To bridge the gap between high-level software engineering and
//             cinematic user experiences, delivering platforms that not only
//             function flawlessly but command immediate trust and authority."
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );

//   return (
//     <section className="py-24" id="about">
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.8 }}
//       >
//         {isSpatialMode ? (
//           // SPATIAL MODE: Glass Panel box with the free-floating circular nodes inside
//           <div className="glass-panel relative w-full rounded-2xl transition-all duration-500 ease-out overflow-hidden bg-black/30 backdrop-blur-2xl border border-cyan-500/20 p-8 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
//             {aboutContent}
//           </div>
//         ) : (
//           // EXECUTIVE MODE: Free layout, text directly on grey background
//           <div className="w-full">{aboutContent}</div>
//         )}
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { useViewStore } from "@/store/useViewStore";
import { motion } from "framer-motion";
import { Layers, Code2, Target, Cpu, Globe } from "lucide-react"; // User hataya kyunki ab asli image hai
import { cn } from "@/lib/utils";

export default function About() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  const aboutContent = (
    <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
      {/* Left Column: 3 Interconnected Image Nodes & Stats */}
      <div className="w-full lg:w-5/12 space-y-12">
        {/* --- 3 INTERCONNECTED CIRCULAR NODES --- */}
        <div className="relative w-full aspect-square max-w-[380px] mx-auto lg:mx-0">
          {/* Spatial Mode Connecting Lines (Neural Network vibe) */}
          {isSpatialMode && (
            <svg className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none">
              <line
                x1="35%"
                y1="35%"
                x2="70%"
                y2="70%"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <line
                x1="35%"
                y1="35%"
                x2="80%"
                y2="25%"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          )}

          {/* Node 1: Main Founder Image (Large) - UPDATED WITH REAL IMAGE */}
          {/* Node 1: Main Founder Image */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "absolute top-[5%] left-[5%] w-[65%] aspect-square rounded-full transition-all duration-500 z-10 group overflow-hidden p-[2px]",
              isSpatialMode
                ? "shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]" 
                : "shadow-xl hover:shadow-2xl bg-white" // Executive mode me white base
            )}
          >
            {/* THE ADAPTIVE ROTATING BORDER (Ab ye hamesha chalega) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className={cn(
                "absolute inset-[-50%] z-0",
                // Spatial me Cyan, Executive me Subtle Grey/Silver
                isSpatialMode 
                  ? "bg-[conic-gradient(from_0deg,transparent_70%,#06b6d4_100%)]" 
                  : "bg-[conic-gradient(from_0deg,transparent_70%,#D1D1D6_100%)]" 
              )}
            />

            {/* Inner Content Container */}
            <div className={cn(
              "relative z-10 w-full h-full rounded-full flex flex-col items-center justify-center overflow-hidden",
              isSpatialMode ? "bg-[#050505]" : "bg-[#F5F5F7]"
            )}>
              <img
                src="/ravi-profile.jpg"
                alt="Ravi Kumar Keshari"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                  isSpatialMode ? "opacity-60 group-hover:opacity-90 mix-blend-luminosity" : "opacity-100"
                )}
              />
              <span className={cn(
                "relative z-10 text-[10px] font-mono font-bold mt-auto mb-6 px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300",
                isSpatialMode 
                  ? "bg-black/60 text-cyan-400 border border-cyan-500/30" 
                  : "bg-white/80 text-black border border-neutral-200 shadow-sm"
              )}>
                FOUNDER
              </span>
            </div>
          </motion.div>

          {/* Node 2: Setup/Code Image - ADAPTIVE GLOW */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={cn(
              "absolute bottom-[5%] right-[5%] w-[50%] aspect-square rounded-full transition-all duration-500 z-20 group overflow-hidden p-[2px]",
              isSpatialMode
                ? "shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                : "shadow-lg hover:shadow-xl bg-white"
            )}
          >
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className={cn(
                "absolute inset-[-50%] z-0",
                isSpatialMode 
                  ? "bg-[conic-gradient(from_0deg,transparent_60%,#22d3ee_100%)]" 
                  : "bg-[conic-gradient(from_0deg,transparent_60%,#E5E5EA_100%)]" 
              )}
            />

            <div className={cn(
              "relative z-10 w-full h-full rounded-full flex flex-col items-center justify-center overflow-hidden",
              isSpatialMode ? "bg-[#050505]" : "bg-[#F5F5F7]"
            )}>
              <img
                src="\setup.jpg"
                alt="Developer Setup"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover object-[25%_30%] transition-all duration-500",
                  isSpatialMode ? "opacity-50 grayscale mix-blend-luminosity group-hover:grayscale-0" : "opacity-100"
                )}
              />
              <span className={cn(
                "relative z-10 text-[9px] font-mono mt-auto mb-4 px-2 py-0.5 rounded backdrop-blur-sm border transition-all duration-300",
                isSpatialMode 
                  ? "bg-black/60 text-cyan-400 border-cyan-500/30" 
                  : "bg-white/80 text-neutral-600 border-neutral-200"
              )}>
                
              </span>
            </div>
          </motion.div>

          {/* Node 3: Aesthetic/Network - ADAPTIVE GLOW */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className={cn(
              "absolute top-[10%] right-[0%] w-[35%] aspect-square rounded-full transition-all duration-500 z-0 group overflow-hidden p-[1px]",
              isSpatialMode
                ? "shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                : "shadow-md hover:shadow-lg bg-white"
            )}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              className={cn(
                "absolute inset-[-50%] z-0",
                isSpatialMode 
                  ? "bg-[conic-gradient(from_0deg,transparent_50%,#0284c7_100%)]" 
                  : "bg-[conic-gradient(from_0deg,transparent_50%,#F2F2F7_100%)]" 
              )}
            />

            <div className={cn(
              "relative z-10 w-full h-full rounded-full flex flex-col items-center justify-center overflow-hidden",
              isSpatialMode ? "bg-[#050505]" : "bg-[#F5F5F7]"
            )}>
              <img
                src="\internet.webp"
                alt="Global Cyber Network"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                  isSpatialMode ? "opacity-50 grayscale mix-blend-luminosity group-hover:grayscale-0" : "opacity-100"
                )}
              />
            </div>
          </motion.div>
        </div>
        {/* --- END INTERCONNECTED NODES --- */}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className={cn(
              "p-6 rounded-2xl transition-all duration-500",
              isSpatialMode
                ? "bg-black/40 border border-cyan-900/50"
                : "bg-white border border-neutral-200/60 shadow-sm hover:shadow-md",
            )}
          >
            <Layers
              className={cn(
                "mb-3",
                isSpatialMode ? "text-cyan-400" : "text-[#1D1D1F]",
              )}
              size={24}
            />
            <div
              className={cn(
                "text-3xl font-bold mb-1",
                isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
              )}
            >
              5+
            </div>
            <div
              className={cn(
                "text-xs uppercase tracking-wider",
                isSpatialMode ? "text-cyan-600 font-mono" : "text-neutral-500",
              )}
            >
              Completed Projects
            </div>
          </div>
          <div
            className={cn(
              "p-6 rounded-2xl transition-all duration-500",
              isSpatialMode
                ? "bg-black/40 border border-cyan-900/50"
                : "bg-white border border-neutral-200/60 shadow-sm hover:shadow-md",
            )}
          >
            <Code2
              className={cn(
                "mb-3",
                isSpatialMode ? "text-cyan-400" : "text-[#1D1D1F]",
              )}
              size={24}
            />
            <div
              className={cn(
                "text-3xl font-bold mb-1",
                isSpatialMode ? "text-white font-mono" : "text-[#1D1D1F]",
              )}
            >
              1+ Yrs
            </div>
            <div
              className={cn(
                "text-xs uppercase tracking-wider",
                isSpatialMode ? "text-cyan-600 font-mono" : "text-neutral-500",
              )}
            >
              Engineering Exp.
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Text Content */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center pt-4 lg:pt-8">
        <h2
          className={cn(
            "text-4xl md:text-5xl font-bold tracking-tight mb-8 transition-colors duration-500",
            isSpatialMode ? "text-white font-mono uppercase" : "text-[#1D1D1F]",
          )}
        >
          {isSpatialMode ? "> About the Founder" : "About the Founder"}
        </h2>

        <div
          className={cn(
            "space-y-6 text-lg leading-relaxed transition-colors duration-500",
            isSpatialMode
              ? "text-neutral-300 font-mono text-sm"
              : "text-neutral-600",
          )}
        >
          {isSpatialMode && (
            <div className="text-cyan-500 mb-4">Indian Institute of Technology Patna</div>
          )}
          <p>
            My journey into development started with a simple fascination for
            how things are built. As a Computer Science and Engineering student
            at IIT Patna, I quickly realized that writing functional code wasn't
            enough. The real impact happens when complex engineering meets
            flawless, cinematic design.
          </p>
          <p>
            By combining my background in video editing with advanced web
            technologies like Next.js, React, and Three.js, I don't just build
            websites. I engineer digital environments. From developing civic
            engagement platforms like CivicRise India to building comprehensive
            management tools like Core-Connect, my focus has always been on
            solving real-world problems through robust, scalable code.
          </p>
        </div>

        {/* Mission Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.02,
            x: 8,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className={cn(
            "mt-10 p-8 rounded-2xl border-l-4 transition-all duration-500 group cursor-default relative overflow-hidden",
            isSpatialMode
              ? "bg-cyan-950/20 border-cyan-500 text-cyan-50 hover:bg-cyan-900/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:border-cyan-400"
              : "bg-white shadow-md border-[#1D1D1F] text-[#1D1D1F] hover:shadow-2xl hover:border-neutral-600",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
              isSpatialMode
                ? "bg-gradient-to-r from-cyan-500/10 to-transparent"
                : "bg-gradient-to-r from-neutral-100 to-transparent",
            )}
          />
          <div className="relative z-10 flex items-center gap-3 mb-4">
            <Target
              className={cn(
                "transition-all duration-500 group-hover:rotate-90 group-hover:scale-110",
                isSpatialMode
                  ? "text-cyan-400 group-hover:text-cyan-300"
                  : "text-[#1D1D1F] group-hover:text-neutral-700",
              )}
              size={24}
            />
            <h3
              className={cn(
                "text-xl font-bold transition-colors duration-300",
                isSpatialMode
                  ? "font-mono uppercase group-hover:text-cyan-300"
                  : "group-hover:text-neutral-800",
              )}
            >
              {isSpatialMode ? "My Objective" : "My Objective"}
            </h3>
          </div>
          <p
            className={cn(
              "italic leading-relaxed relative z-10 transition-colors duration-300",
              isSpatialMode
                ? "text-cyan-200/80 font-mono text-sm group-hover:text-cyan-100"
                : "text-neutral-600 group-hover:text-neutral-900",
            )}
          >
            "To bridge the gap between high-level software engineering and
            cinematic user experiences, delivering platforms that not only
            function flawlessly but command immediate trust and authority."
          </p>
        </motion.div>
      </div>
    </div>
  );

  return (
    <section className="py-24" id="about">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {isSpatialMode ? (
          <div className="glass-panel relative w-full rounded-2xl transition-all duration-500 ease-out overflow-hidden bg-black/30 backdrop-blur-2xl border border-cyan-500/20 p-8 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
            {aboutContent}
          </div>
        ) : (
          <div className="w-full">{aboutContent}</div>
        )}
      </motion.div>
    </section>
  );
}
