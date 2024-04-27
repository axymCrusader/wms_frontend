<script setup lang="ts">
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import { equipmentTypeColumns } from "@/utils/TableColums/EquipmentTypeTableColums";

const equipmentTypeStore = useEquipmentTypeStore();
const { EquipmentTypes } = storeToRefs(equipmentTypeStore);

const deleteRow = (id: number) => {
  equipmentTypeStore.deleteEquipmentType(id);
};
</script>

<template>
  <q-table
    title="Типы оборудовании"
    :rows="EquipmentTypes"
    :columns="equipmentTypeColumns"
    row-key="id"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" @click="deleteRow(props.row.id)" />
      </q-td>
    </template>
  </q-table>
</template>
