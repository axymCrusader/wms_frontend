export interface Id {
  id: number;
}
export interface IEquipmentCharacteristic extends Id {
  name: string;
}
export interface IRelationshipСharacteristicType extends Id {
  equipmentTypeId: number;
}
