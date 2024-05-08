export interface Id {
  id: number;
}

export interface IBalance extends Id {
  equipmentId: number;
  equipmentCode: string;
  wareHouseId: number;
  date: string;
  equipmentQuantity: number;
}
