import { ReactNode } from "react";
import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  content: ReactNode | null;
  openDialog: (content: ReactNode) => void;
  closeDialog: () => void;
  onDialogClose: () => void;
  //   title: string | null;
  //   description: string | null;
  //   onClose: () => void;
  //   onAction: () => void;
  //   openDialog: (data: {
  //     title: string;
  //     description: string;
  //     onCancel: () => void;
  //     onAction: () => void;
  //   }) => void;
}

const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  content: null,
  openDialog: (content) => set({ content, isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
  onDialogClose: () => set({ isOpen: false }),
  //   title: null,
  //   description: null,
  //   onClose: () => {
  //     set({
  //       isOpen: false,
  //     });
  //   },
  //   onAction: () => {
  //     //
  //   },
  //   openDialog: (data) => set((state) => ({ isOpen: true, ...data })),
}));

export default useDialogStore;
