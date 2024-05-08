<script setup lang="ts">
import { useSupplierStore } from "@/store/SupplierStore";
import { supplierColumns } from "@/utils/TableColums/SupplierTableColums";

const supplierStore = useSupplierStore();
const { Suppliers } = storeToRefs(supplierStore);

const filter = ref("");

const deleteRow = (id: number) => {
  supplierStore.deleteSupplier(id);
};
</script>

<template>
  <q-table
    title="Поставщики"
    :rows="Suppliers"
    :columns="supplierColumns"
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
