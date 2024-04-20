import { defineStore } from "pinia";

export const useEquipmentRequirementStore = defineStore(
  "EquipmentRequirementStore",
  {
    state: () => ({
      equipmentRequirements: [
        {
          requirementId: "ПВ1",
          requirementEquipmentId: "O1",
          requirementWareHouseId: "C1",
          requirementEquipmentQuantity: 23,
        },
        {
          requirementId: "ПВ2",
          requirementEquipmentId: "O1",
          requirementWareHouseId: "C2",
          requirementEquipmentQuantity: 11,
        },
        {
          requirementId: "ПВ3",
          requirementEquipmentId: "O2",
          requirementWareHouseId: "C1",
          requirementEquipmentQuantity: 3,
        },
      ],
    }),
    actions: {
      async fetchEquipmentRequirements() {},
    },
  }
);
