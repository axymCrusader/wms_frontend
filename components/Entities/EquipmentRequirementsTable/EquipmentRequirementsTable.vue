<script setup lang="ts">
import { equipmentRequirementsColumns } from "./EquipmentRequirementsTableColums";

const rows = [{ column1: "--", column2: "--", column3: "--", column4: "--" }];
</script>

<template>
  <q-table
    title="Потребность в оборудовании"
    :rows="rows"
    :columns="equipmentRequirementsColumns"
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
