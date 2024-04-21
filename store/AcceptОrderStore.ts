import { defineStore } from "pinia";
import type {
  HeaderAcceptОrder,
  RowAcceptОrder,
} from "@/utils/types/store/AcceptОrderTypes";

export const useAcceptОrderStore = defineStore("AcceptОrderStore", {
  state: () => ({
    HeaderAcceptОrders: [] as HeaderAcceptОrder[],
    RowAcceptОrders: [] as RowAcceptОrder[],
    acceptОrderDialogVisible: false,
  }),
  actions: {
    async fetchAcceptОrders() {
      // $get<EquipmentCharacteristic>("/equipment-characteristic", { isBearer: true })
      //   .then((response) => {this.EquipmentCharacteristics = response;})
      //   .catch((errors) => {console.error(errors)});
    },
  },
});
