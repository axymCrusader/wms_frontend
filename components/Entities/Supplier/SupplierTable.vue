<script setup lang="ts">
import { useSupplierStore } from "@/store/SupplierStore";
import { supplierColumns } from "@/utils/TableColums/SupplierTableColums";

const supplierStore = useSupplierStore();
const { Suppliers } = storeToRefs(supplierStore);

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
