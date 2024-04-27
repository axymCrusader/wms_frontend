export interface Id {
  id: number;
}

export interface IBalance extends Id {
  parentEquipmentId: number;
  equipmentid: number;
  equipmentCode: string;
  wareHouseId: number;
  date: string;
  equipmentQuantity: number;
}
