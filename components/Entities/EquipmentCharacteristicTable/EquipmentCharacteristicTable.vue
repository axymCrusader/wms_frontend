<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import { equipmentCharacteristicColumns } from "./EquipmentCharacteristicTableColums";

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();
const CharacteristicsTableData = computed(
  () => equipmentCharacteristicStore.CharacteristicsTableData
);
const deleteRow = (id: string) => {
  equipmentCharacteristicStore.deleteEquipmentCharacteristic(id);
};
</script>

<template>
  <q-table
    title="Характеристики типов"
    :rows="CharacteristicsTableData"
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
