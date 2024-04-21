import { defineStore } from "pinia";
import type {
  EquipmentCharacteristic,
  RelationshipСharacteristicType,
} from "@/utils/types/store/EquipmentCharacteristicTypes";

export const useEquipmentCharacteristicStore = defineStore(
  "EquipmentCharacteristicStore",
  {
    state: () => ({
      EquipmentCharacteristics: [] as EquipmentCharacteristic[],
      RelationshipsСharacteristicType: [] as RelationshipСharacteristicType[],
      equipmentCharacteristicsDialogVisible: false,
    }),
    actions: {
      async fetchEquipmentCharacteristics() {
        // $get<EquipmentCharacteristic>("/equipment-characteristic", { isBearer: true })
        //   .then((response) => {this.EquipmentCharacteristics = response;})
        //   .catch((errors) => {console.error(errors)});
      },
      async addEquipmentCharacteristic(
        equipmentCharacteristic: EquipmentCharacteristic,
        equipmentTypeIdName: { label: string; value: string }[]
      ) {
        this.EquipmentCharacteristics.push(equipmentCharacteristic);

        equipmentTypeIdName.forEach((equipmentType) => {
          const newRelationship: RelationshipСharacteristicType = {
            equipmentCharacteristicId:
              equipmentCharacteristic.equipmentCharacteristicId,
            equipmentTypeId: equipmentType.value,
          };
          this.RelationshipsСharacteristicType.push(newRelationship);
        });

        this.equipmentCharacteristicsDialogVisible = false;
        // $post<EquipmentCharacteristic>("/equipment-characteristic", { isBearer: true });
        // $post<CharacteristicsTableData>("/equipment-characteristic-table", { isBearer: true });
      },
      async deleteEquipmentCharacteristic(equipmentCharacteristicId: string) {
        this.EquipmentCharacteristics = this.EquipmentCharacteristics.filter(
          (ec) => ec.equipmentCharacteristicId !== equipmentCharacteristicId
        );
        // $delete<EquipmentCharacteristic>("/equipment-characteristic/" + equipmentCharacteristicId, { isBearer: true });
      },
    },
  }
);
