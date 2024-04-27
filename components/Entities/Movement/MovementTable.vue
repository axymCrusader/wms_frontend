<script setup lang="ts">
import { movementColumns } from "@/utils/TableColums/MovementTableColums";
const movements = [
  {
    wareHouseCode: "--",
    documentCode: "--",
    equipmentCode: "--",
    equipmentQuantity: "--",
    date: "--",
    type: "--",
  },
];
</script>

<template>
  <q-table
    title="Движение оборудования"
    :rows="movements"
    :columns="movementColumns"
    row-key="id"
    flat
    sep-rows
  >
  </q-table>
</template>
