import { ReactNode } from "react";
import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  content: ReactNode | null;
  openDialog: (content: ReactNode) => void;
  closeDialog: () => void;
  onDialogClose: () => void;
}

const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  content: null,
  openDialog: (content) => set({ content, isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  onDialogClose: () => set({ isOpen: false }),
}));

export default useDialogStore;
