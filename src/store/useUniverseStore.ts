import { create } from "zustand";

export type UniverseState = {
  isOpen: boolean;
  hoveredPortal: "resume" | "projects" | null;
  isEntering: boolean;
  isExiting: boolean;
  openUniverse: () => void;
  closeUniverse: () => void;
  setHoveredPortal: (portal: "resume" | "projects" | null) => void;
};

export const useUniverseStore = create<UniverseState>()((set) => ({
  isOpen: false,
  hoveredPortal: null,
  isEntering: false,
  isExiting: false,

  openUniverse: () => {
    set({ isEntering: true, isOpen: true });
    // After entry animation completes
    setTimeout(() => set({ isEntering: false }), 2000);
  },

  closeUniverse: () => {
    set({ isExiting: true });
    setTimeout(() => {
      set({ isOpen: false, isExiting: false, hoveredPortal: null });
    }, 800);
  },

  setHoveredPortal: (portal) => set({ hoveredPortal: portal }),
}));
