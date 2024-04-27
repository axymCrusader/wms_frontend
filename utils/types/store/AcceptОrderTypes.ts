export interface Id {
  id: number;
}

export interface IAcceptОrder extends Id {
  code: string;
  status: string;
  date: string;
  wareHouseId: number;
}

export interface IAcceptОrderLine extends Id {
  equipmentId: number;
  equipmentQuantity: number;
  equipmentCode: string;
}
