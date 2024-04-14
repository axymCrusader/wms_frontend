<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import type { EquipmentCharacteristic } from "@/utils/types/store/EquipmentCharacteristicTypes";
import { equipmentCharacteristicColumns } from "./EquipmentCharacteristicTableColums";

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();

const equipmentCharacteristics = computed(
  () => equipmentCharacteristicStore.EquipmentCharacteristics
);
</script>

<template>
  <q-table
    title="Характеристики типов"
    :rows="equipmentCharacteristics"
    :columns="equipmentCharacteristicColumns"
    row-key="equipmentCharacteristicId"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Edit" color="primary" />
      </q-td>
    </template>
  </q-table>
</template>
