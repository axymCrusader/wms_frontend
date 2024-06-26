export interface Id {
  id: number;
}
export interface IDeliveryOrder extends Id {
  code: string;
  status: string;
  date: string;
  equipmentRequirementCode: string | null;
  wareHouseId: number;
}

export interface IDeliveryOrderLine extends Id {
  equipmentId: number;
  equipmentCode: string;
  equipmentQuantity: number;
}
