<script setup lang="ts">
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import { equipmentTypeColumns } from "./EquipmentTypeTableColums";

const equipmentTypeStore = useEquipmentTypeStore();
const equipmentTypes = computed(() => equipmentTypeStore.EquipmentTypes);

const deleteRow = (id: string) => {
  equipmentTypeStore.deleteEquipmentType(id);
}
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
        <q-btn label="Удалить" color="red"  @click="deleteRow(props.row.equipmentTypeId)"/>
      </q-td>
    </template>
  </q-table>
</template>
