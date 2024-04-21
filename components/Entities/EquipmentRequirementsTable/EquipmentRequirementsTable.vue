<script setup lang="ts">
import { equipmentRequirementsColumns } from "./EquipmentRequirementsTableColums";

import { useEquipmentRequirementStore } from "@/store/EquipmentRequirementStore";
const equipmentRequirementStore = useEquipmentRequirementStore();

const equipmentRequirements = computed(
  () => equipmentRequirementStore.equipmentRequirements
);
</script>

<template>
  <q-table
    title="Потребность в оборудовании"
    :rows="equipmentRequirements"
    :columns="equipmentRequirementsColumns"
    row-key="equipmentTypeId"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" />
        <q-btn label="Создать заказ" color="blue" />
      </q-td>
    </template>
  </q-table>
</template>
