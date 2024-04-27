export interface Id {
  id: number;
}

export interface IShippingOrder extends Id {
  code: string;
  status: string;
  date: string;
  wareHouseId: number;
}

export interface IShippingOrderLine extends Id {
  equipmentId: number;
  equipmentQuantity: number;
  equipmentCode: string;
}
