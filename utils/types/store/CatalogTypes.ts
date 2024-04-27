export interface Id {
  id: number;
}

export interface ICatalog extends Id {
  code: string;
  supplierId: number;
  equipmentId: number;
  price: number;
}
