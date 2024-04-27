import { defineStore } from "pinia";
import type {
  IAcceptОrder,
  IAcceptОrderLine,
} from "@/utils/types/store/AcceptОrderTypes";

interface IState {
  AcceptОrders: IAcceptОrder[];
  AcceptОrderLines: IAcceptОrderLine[];
  acceptОrderDialogVisible: boolean;
}

export const useAcceptОrderStore = defineStore("AcceptОrderStore", {
  state: (): IState => ({
    AcceptОrders: [],
    AcceptОrderLines: [],
    acceptОrderDialogVisible: false,
  }),
  actions: {},
});
