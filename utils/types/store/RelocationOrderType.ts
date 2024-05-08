export interface Id {
  id: number;
}
export interface IRelocationOrder extends Id {
  code: string;
  status: string;
  date: string;
  equipmentRequirementCode: string | null;
  wareHouseId: number;
}

export interface IRelocationOrder extends Id {
  equipmentId: number;
  equipmentCode: string;
  equipmentQuantity: number;
}
