import { defineStore } from "pinia";

export const useEquipmentRequirementStore = defineStore(
  "EquipmentRequirementStore",
  {
    state: () => ({
      EquipmentRequirements: [
        {
          id: 1,
          code: "ПВ1",
          equipmentCode: "O1",
          wareHouseCode: "C1",
          equipmentQuantity: 23,
        },
        {
          id: 2,
          code: "ПВ2",
          equipmentCode: "O1",
          wareHouseCode: "C2",
          equipmentQuantity: 2,
        },
        {
          id: 3,
          code: "ПВ3",
          equipmentCode: "O2",
          wareHouseCode: "C2",
          equipmentQuantity: 12,
        },
      ],
    }),
    actions: {},
  }
);
