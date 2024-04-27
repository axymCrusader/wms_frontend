export interface Id {
  id: number;
}
export interface ISupplier extends Id {
  name: string;
  inn: string;
  bic: string;
  contactPerson: string;
  phone: string;
}
