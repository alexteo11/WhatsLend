import { create } from "zustand";

export type ActionMode = "view" | "modify";

interface ApplicationDetailsState {
  applicationId: string;
  actionMode: ActionMode;
  setApplicationId: (id: string) => void;
  setActionMode: (actionMode: ActionMode) => void;
}

const useApplicationDetailsStore = create<ApplicationDetailsState>((set) => ({
  applicationId:
    typeof window !== "undefined"
      ? window.localStorage.getItem("compareLoanApplicationId") || ""
      : "",
  actionMode: "view",
  setApplicationId: (id) => {
    window.localStorage.setItem("compareLoanApplicationId", id);
    set({ applicationId: id });
  },
  setActionMode: (actionMode) => set({ actionMode }),
}));

export default useApplicationDetailsStore;
