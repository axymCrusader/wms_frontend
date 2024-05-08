<script setup lang="ts">
import { useWarehouseStore } from "@/store/WareHouseStore";
import { wareHouseColumns } from "@/utils/TableColums/WareHouseTableColums";

const warehouseStore = useWarehouseStore();
const { WareHouses } = storeToRefs(warehouseStore);

const filter = ref("");

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
