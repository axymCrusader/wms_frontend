import { defineStore } from "pinia";
import type { IEquipment, IProperty } from "@/utils/types/store/EquipmentTypes";

interface IState {
  Equipments: IEquipment[];
  Properties: IProperty[];
  equipmentAddDialogVisible: boolean;
  equipmentShowDialogVisible: boolean;
}

export const useEquipmentStore = defineStore("EquipmentStore", {
  state: (): IState => ({
    Equipments: [],
    Properties: [],
    equipmentAddDialogVisible: false,
    equipmentShowDialogVisible: false,
  }),
  actions: {
    addEquipment(equipment: IEquipment) {
      this.Equipments.push(equipment);
    },
    addProperty(property: IProperty) {
      this.Properties.push(property);
      this.equipmentAddDialogVisible = false;
    },
    deleteEquipment(id: number) {
      this.Equipments = this.Equipments.filter(
        (equipment) => equipment.id !== id
      );
      this.Properties = this.Properties.filter(
        (equipment) => equipment.id !== id
      );
    },
  },
});
