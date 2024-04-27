export interface Id {
  id: number;
}

export interface IEquipment extends Id {
  code: string;
  name: string;
  equipmentTypeId: number;
}

export interface IProperty extends Id {
  equipmentCharacteristicId: number;
  value: string;
}
