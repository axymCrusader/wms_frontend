export interface Catalog {
  catalogId: string;
  catalogSupplierId: string;
  catalogEquipmentId: string;
  catalogPrice: string;
}

export interface Equipment {
  equipmentId: string;
  equipmentName: string;
  equipmentTypeId: string;
}

export interface Property {
  equipmentId: string;
  equipmentCharacteristicId: string;
  propertyValue: string;
}
