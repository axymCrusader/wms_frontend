import { defineStore } from "pinia";
import axios from "axios";
import type { EquipmentType } from "@/utils/types/store/EquipmentTypeTypes";

export const useEquipmentTypeStore = defineStore({
  id: "EquipmentType",
  state: () => ({
    EquipmentTypes: [] as EquipmentType[],
  }),
  actions: {
    async fetchEquipmentTypes() {
      await axios
        .get("/api/app/equipment-type/")
        .then((response) => (this.EquipmentTypes = response.data));
    },
  },
});
