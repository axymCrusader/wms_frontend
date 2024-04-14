<script setup lang="ts">
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import type { EquipmentType } from "@/utils/types/store/EquipmentTypeTypes";
import { equipmentTypeColumns } from "./EquipmentTypeTableColums";

const equipmentTypeStore = useEquipmentTypeStore();

const equipmentTypes = computed(() => equipmentTypeStore.EquipmentTypes);
</script>

<template>
  <q-table
    title="Типы оборудовании"
    :rows="equipmentTypes"
    :columns="equipmentTypeColumns"
    row-key="equipmentTypeId"
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
