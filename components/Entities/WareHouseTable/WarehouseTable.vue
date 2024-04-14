<script setup lang="ts">
import { useWarehouseStore } from "@/store/WareHouseStore";
import type { WareHouse } from "@/utils/types/store/WareHouseTypes";
import { wareHouseColumns } from "./WareHouseTableColums";

const warehouseStore = useWarehouseStore();

const warehouses = computed(() => warehouseStore.WareHouses);
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
        <q-btn label="Edit" color="primary" />
      </q-td>
    </template>
  </q-table>
</template>
