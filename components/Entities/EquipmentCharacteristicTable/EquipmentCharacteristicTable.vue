<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import { equipmentCharacteristicColumns } from "./EquipmentCharacteristicTableColums";

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();
const equipmentTypeStore = useEquipmentTypeStore();

const joinedData = equipmentCharacteristicStore.EquipmentCharacteristics.map(
  (ec: any) => {
    const relationships =
      equipmentCharacteristicStore.RelationshipsСharacteristicType.filter(
        (r: any) => r.equipmentCharacteristicId === ec.equipmentCharacteristicId
      );
    const equipmentTypes = relationships.map((r: any) =>
      equipmentTypeStore.EquipmentTypes.find(
        (et: any) => et.equipmentTypeId === r.equipmentTypeId
      )
    );

    return {
      equipmentCharacteristicId: ec.equipmentCharacteristicId,
      equipmentCharacteristicName: ec.equipmentCharacteristicName,
      equipmentTypesName: equipmentTypes
        .map((et: any) => et.equipmentTypeName)
        .join(", "),
    };
  }
);

const deleteRow = (id: string) => {
  equipmentCharacteristicStore.deleteEquipmentCharacteristic(id);
};
</script>

<template>
  <q-table
    title="Характеристики типов"
    :rows="joinedData"
    :columns="equipmentCharacteristicColumns"
    row-key="equipmentCharacteristicId"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          label="Удалить"
          color="red"
          @click="deleteRow(props.row.equipmentCharacteristicId)"
        />
      </q-td>
    </template>
  </q-table>
</template>
