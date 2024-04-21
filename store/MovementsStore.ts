import { defineStore } from "pinia";
import type { Movement } from "~/utils/types/store/MovementsTypes";

export const useMovementStore = defineStore("MovementStore", {
  state: () => ({
    Movements: [] as Movement[],
  }),
  actions: {
    async fetchMovements() {
      // $get<EquipmentCharacteristic>("/equipment-characteristic", { isBearer: true })
      //   .then((response) => {this.EquipmentCharacteristics = response;})
      //   .catch((errors) => {console.error(errors)});
    },
  },
});
