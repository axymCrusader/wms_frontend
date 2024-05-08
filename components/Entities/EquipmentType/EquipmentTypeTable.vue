<script setup lang="ts">
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import { equipmentTypeColumns } from "@/utils/TableColums/EquipmentTypeTableColums";

const equipmentTypeStore = useEquipmentTypeStore();
const { EquipmentTypes } = storeToRefs(equipmentTypeStore);

const filter = ref("");

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
    :filter="filter"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" @click="deleteRow(props.row.id)" />
        <q-btn class="q-ml-sm" label="Редактировать" color="green" />
      </q-td>
    </template>
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Поиск"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>
