import { defineStore } from "pinia";
import type {
  IEquipmentCharacteristic,
  IRelationshipСharacteristicType,
} from "@/utils/types/store/EquipmentCharacteristicTypes";

interface IState {
  EquipmentCharacteristics: IEquipmentCharacteristic[];
  RelationshipsСharacteristicType: IRelationshipСharacteristicType[];
  equipmentCharacteristicsDialogVisible: boolean;
}

export const useEquipmentCharacteristicStore = defineStore(
  "EquipmentCharacteristicStore",
  {
    state: (): IState => ({
      EquipmentCharacteristics: [],
      RelationshipsСharacteristicType: [],
      equipmentCharacteristicsDialogVisible: false,
    }),
    actions: {
      async fetchEquipmentCharacteristics() {
        // $get<EquipmentCharacteristic>("/equipment-characteristic", { isBearer: true })
        //   .then((response) => {this.EquipmentCharacteristics = response;})
        //   .catch((errors) => {console.error(errors)});
      },
      addEquipmentCharacteristic(
        equipmentCharacteristic: IEquipmentCharacteristic,
        equipmentTypeIdName: { label: string; value: number }[]
      ) {
        equipmentCharacteristic.id = this.EquipmentCharacteristics.length + 1;
        this.EquipmentCharacteristics.push(equipmentCharacteristic);

        equipmentTypeIdName.forEach((equipmentType) => {
          const newRelationship: IRelationshipСharacteristicType = {
            id: equipmentCharacteristic.id,
            equipmentTypeId: equipmentType.value,
          };
          this.RelationshipsСharacteristicType.push(newRelationship);
        });

        this.equipmentCharacteristicsDialogVisible = false;
      },
      deleteEquipmentCharacteristic(id: number) {
        this.EquipmentCharacteristics = this.EquipmentCharacteristics.filter(
          (ec) => ec.id !== id
        );
        this.RelationshipsСharacteristicType =
          this.RelationshipsСharacteristicType.filter((r) => r.id !== id);
        // $delete<EquipmentCharacteristic>("/equipment-characteristic/" + equipmentCharacteristicId, { isBearer: true });
      },
    },
  }
);
