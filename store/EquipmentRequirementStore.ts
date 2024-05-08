import { defineStore } from "pinia";
import type { IEquipmentRequirement } from "@/utils/types/store/EquipmentRequirementTypes";

interface IState {
  EquipmentRequirements: IEquipmentRequirement[];
  currentEquipmentRequirement: IEquipmentRequirement | null;
}

export const useEquipmentRequirementStore = defineStore(
  "EquipmentRequirementStore",
  {
    state: (): IState => ({
      EquipmentRequirements: [
        {
          id: 1,
          code: "ПВ1",
          equipmentCode: "O1",
          wareHouseCode: "УФ-21",
          equipmentQuantity: 23,
        },
        {
          id: 2,
          code: "ПВ2",
          equipmentCode: "O1",
          wareHouseCode: "УФ-22",
          equipmentQuantity: 2,
        },
        {
          id: 3,
          code: "ПВ3",
          equipmentCode: "O2",
          wareHouseCode: "УФ-23",
          equipmentQuantity: 12,
        },
        {
          id: 3,
          code: "ПВ1",
          equipmentCode: "O2",
          wareHouseCode: "УФ-21",
          equipmentQuantity: 2,
        },
      ],
      currentEquipmentRequirement: null,
    }),
    actions: {
      setRequirementData(requirement: IEquipmentRequirement) {
        this.currentEquipmentRequirement = requirement;
      },
    },
  }
);
