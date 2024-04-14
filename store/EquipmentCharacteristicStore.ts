import { defineStore } from "pinia";
import type { EquipmentCharacteristic } from "@/utils/types/store/EquipmentCharacteristicTypes";

export const useEquipmentCharacteristicStore = defineStore({
  id: "EquipmentCharacteristic",
  state: () => ({
    EquipmentCharacteristics: [] as EquipmentCharacteristic[],
  }),
  actions: {
    async fetchEquipmentCharacteristics() {
      $get<EquipmentCharacteristic>("/equipment-characteristic", {
        isBearer: true,
      })
        .then((res) => {})
        .catch((error) => {});
    },
  },
});
