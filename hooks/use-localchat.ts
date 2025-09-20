import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocalChatState {
  localModelId: string;
  isHistoryOpen: boolean;
  onToggleHistory: () => void;
  setLocalModelId: (id: string) => void;
}

export const useLocalChat = create<LocalChatState>()(
  persist(
    (set, get) => ({
      localModelId: "",
      isHistoryOpen: false,
      onToggleHistory: () => set({ isHistoryOpen: !get().isHistoryOpen }),
      setLocalModelId: (id) => set({ localModelId: id }),
    }),
    {
      name: "local-chat",
    }
  )
);
