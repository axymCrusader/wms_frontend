import { defineStore } from "pinia";
import type {
  EquipmentCharacteristic,
  CharacteristicTableData,
} from "@/utils/types/store/EquipmentCharacteristicTypes";

export const useEquipmentCharacteristicStore = defineStore(
  "EquipmentCharacteristicStore",
  {
    state: () => ({
      EquipmentCharacteristics: [] as EquipmentCharacteristic[],
      CharacteristicsTableData: [] as CharacteristicTableData[],
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

        for (let i = 0; i < equipmentTypeIdName.length; i++) {
          this.CharacteristicsTableData.push({
            equipmentCharacteristicId:
              equipmentCharacteristic.equipmentCharacteristicId,
            equipmentCharacteristicName:
              equipmentCharacteristic.equipmentCharacteristicName,
            equipmentTypeId: equipmentTypeIdName[i].value,
            equipmentTypeName: equipmentTypeIdName[i].label,
          });
        }
        this.equipmentCharacteristicsDialogVisible = false;
        // $post<EquipmentCharacteristic>("/equipment-characteristic", { isBearer: true });
        // $post<CharacteristicsTableData>("/equipment-characteristic-table", { isBearer: true });
      },
      async deleteEquipmentCharacteristic(equipmentCharacteristicId: string) {
        this.EquipmentCharacteristics = this.EquipmentCharacteristics.filter(
          (ec) => ec.equipmentCharacteristicId !== equipmentCharacteristicId
        );
        this.CharacteristicsTableData = this.CharacteristicsTableData.filter(
          (ctd) => ctd.equipmentCharacteristicId !== equipmentCharacteristicId
        );
        // $delete<EquipmentCharacteristic>("/equipment-characteristic/" + equipmentCharacteristicId, { isBearer: true });
      },
    },
  }
);
