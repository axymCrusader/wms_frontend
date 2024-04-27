import { defineStore } from "pinia";
import type { IEquipmentType } from "@/utils/types/store/EquipmentTypeTypes";

interface IState {
  EquipmentTypes: IEquipmentType[];
  equipmentTypeDialogVisible: boolean;
}

export const useEquipmentTypeStore = defineStore("EquipmentTypeStore", {
  state: (): IState => ({
    EquipmentTypes: [],
    equipmentTypeDialogVisible: false,
  }),
  actions: {
    async fetchEquipmentTypes() {
      // $get<EquipmentType>("/equipment-type", { isBearer: true })
      //   .then((response) => {this.EquipmentTypes = response;})
      //   .catch((errors) => {console.error(errors)});
    },
    addEquipmentType(equipmentType: IEquipmentType) {
      equipmentType.id = this.EquipmentTypes.length + 1;
      this.EquipmentTypes.push(equipmentType);
      this.equipmentTypeDialogVisible = false;
      // $post<EquipmentType>("/equipment-type", { isBearer: true });
    },
    deleteEquipmentType(id: number) {
      this.EquipmentTypes = this.EquipmentTypes.filter((et) => et.id !== id);
      // $delete<EquipmentType>("/equipment-type/" + equipmentTypeId, { isBearer: true });
    },
  },
});
