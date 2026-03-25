"use client";

import { Canvas } from "@react-three/fiber";
import { useViewStore } from "@/store/useViewStore";
import SpatialGrid from "./SpatialGrid";
import { motion, AnimatePresence } from "framer-motion";

export default function Scene() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  return (
    <AnimatePresence>
      {isSpatialMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 -z-10 bg-[#030303]" // Force deep black background
        >
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <SpatialGrid />
          </Canvas>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
