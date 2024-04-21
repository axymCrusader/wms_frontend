export interface HeaderShippingOrder {
  shippingOrderId: string;
  shippingOrderStatus: string;
  shippingOrderDate: string;
  shippingOrderWareHouseId: string;
}

export interface RowShippingOrder {
  rowshippingOrderId: string;
  rowEquipmentId: string;
  rowEquipmentQuantity: number;
  rowEquipmentSerialNumber: string;
}
