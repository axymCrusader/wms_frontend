export interface Id {
  id: number;
}
export interface IMovement extends Id {
  wareHouseId: number;
  documentId: number;
  equipmentId: number;
  date: string;
  type: string;
  equipmentQuantity: number;
}
