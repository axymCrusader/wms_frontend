export interface Id {
  id: number;
}

export interface IWareHouse extends Id {
  code: string;
  name: string;
  type: string;
  address: string;
  contactPerson: string;
  phone: string;
}
