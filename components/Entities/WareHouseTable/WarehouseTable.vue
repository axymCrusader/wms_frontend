<script setup lang="ts">
import { useWarehouseStore } from "@/store/WareHouseStore";
import { wareHouseColumns } from "./WareHouseTableColums";

const warehouseStore = useWarehouseStore();
const warehouses = computed(() => warehouseStore.WareHouses);

const deleteRow = (id: string) => {
  warehouseStore.deleteWareHouse(id);
}
</script>

<template>
  <q-table
    title="Склады"
    :rows="warehouses"
    :columns="wareHouseColumns"
    row-key="wareHouseId"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" @click="deleteRow(props.row.wareHouseId)" />
      </q-td>
    </template>
  </q-table>
</template>
