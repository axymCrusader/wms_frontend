<script setup lang="ts">
import { useWarehouseStore } from "@/store/WareHouseStore";
import { wareHouseColumns } from "@/utils/TableColums/WareHouseTableColums";

const warehouseStore = useWarehouseStore();
const { WareHouses } = storeToRefs(warehouseStore);

const deleteRow = (id: number) => {
  warehouseStore.deleteWareHouse(id);
};
</script>

<template>
  <q-table
    title="Склады"
    :rows="WareHouses"
    :columns="wareHouseColumns"
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
