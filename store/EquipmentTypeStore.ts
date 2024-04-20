import { defineStore } from "pinia";
import type { EquipmentType } from "@/utils/types/store/EquipmentTypeTypes";

export const useEquipmentTypeStore = defineStore("EquipmentTypeStore",{
  state: () => ({
    EquipmentTypes: [] as EquipmentType[],
    equipmentTypeDialogVisible: false,
  }),
  actions: {
    async fetchEquipmentTypes() {
      // $get<EquipmentType>("/equipment-type", { isBearer: true })
      //   .then((response) => {this.EquipmentTypes = response;})
      //   .catch((errors) => {console.error(errors)});
    },
    async addEquipmentType(equipmentType: EquipmentType) {
      this.EquipmentTypes.push(equipmentType);
      this.equipmentTypeDialogVisible = false;
      // $post<EquipmentType>("/equipment-type", { isBearer: true });
    },
    async deleteEquipmentType(equipmentTypeId: string) {
      this.EquipmentTypes = this.EquipmentTypes.filter(et => et.equipmentTypeId !== equipmentTypeId);
      // $delete<EquipmentType>("/equipment-type/" + equipmentTypeId, { isBearer: true });
    }, 
  },
});
