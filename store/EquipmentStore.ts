import { defineStore } from "pinia";
import type {
  IEquipment,
  IProperty,
  IHandbook,
} from "@/utils/types/store/EquipmentTypes";

interface IState {
  Equipments: IEquipment[];
  Properties: IProperty[];
  Handbooks: IHandbook[];
  equipmentAddDialogVisible: boolean;
  equipmentShowDialogVisible: boolean;
  handbookAddDialogVisible: boolean;
}

export const useEquipmentStore = defineStore("EquipmentStore", {
  state: (): IState => ({
    Equipments: [],
    Properties: [],
    Handbooks: [],

    equipmentAddDialogVisible: false,
    equipmentShowDialogVisible: false,
    handbookAddDialogVisible: false,
  }),
  actions: {
    addEquipment(equipment: IEquipment) {
      this.Equipments.push(equipment);
    },
    addProperty(property: IProperty) {
      this.Properties.push(property);
      this.equipmentAddDialogVisible = false;
    },
    addHandBook(handbooks: IHandbook[]) {
      handbooks.forEach((handbook) => {
        this.Handbooks.push(handbook);
      });
      this.handbookAddDialogVisible = false;
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
