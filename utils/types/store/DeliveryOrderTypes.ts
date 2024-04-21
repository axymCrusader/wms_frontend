export interface HeaderDeliveryOrder {
  deliveryOrderId: string;
  deliveryOrderStatus: string;
  deliveryOrderDate: string;
  deliveryOrderEquipmentRequirementId: string;
  deliveryOrderWareHouseId: string;
}

export interface RowDeliveryOrder {
  rowdeliveryOrderId: string;
  rowEquipmentId: string;
  rowEquipmentQuantity: number;
  rowEquipmentSerialNumber: string;
}
