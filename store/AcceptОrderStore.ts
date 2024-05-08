import { defineStore } from "pinia";
import type {
  IAcceptОrder,
  IAcceptОrderLine,
} from "@/utils/types/store/AcceptОrderTypes";

interface IState {
  AcceptОrders: IAcceptОrder[];
  AcceptОrderLines: IAcceptОrderLine[];
  acceptОrderAddDialogVisible: boolean;
  acceptОrder_AddDialogVisible: boolean;
}

export const useAcceptОrderStore = defineStore("AcceptОrderStore", {
  state: (): IState => ({
    AcceptОrders: [],
    AcceptОrderLines: [],
    acceptОrderAddDialogVisible: false,
    acceptОrder_AddDialogVisible: false,
  }),
  actions: {
    addAcceptОrder(
      acceptОrder: IAcceptОrder,
      acceptОrderLines: IAcceptОrderLine[]
    ) {
      this.AcceptОrders.push(acceptОrder);

      acceptОrderLines.forEach((aol) => {
        this.AcceptОrderLines.push(aol);
      });
      this.acceptОrderAddDialogVisible = false;
    },
  },
});
