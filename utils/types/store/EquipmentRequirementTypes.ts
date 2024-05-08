export interface Id {
  id: number;
}

export interface IEquipmentRequirement extends Id {
  code: string;
  equipmentCode: string;
  wareHouseCode: string;
  equipmentQuantity: number;
}
