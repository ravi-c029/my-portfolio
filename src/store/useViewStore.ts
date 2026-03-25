import { create } from 'zustand';

type ViewState = {
  isSpatialMode: boolean;
  toggleView: () => void;
};

export const useViewStore = create<ViewState>((set) => ({
  isSpatialMode: false, // Default to the clean, high-trust Executive view
  toggleView: () => set((state) => ({ isSpatialMode: !state.isSpatialMode })),
}));