<script setup lang="ts">
import { useSupplierStore } from "@/store/SupplierStore";
import { supplierColumns } from "./SupplierTableColums";

const supplierStore = useSupplierStore();
const suppliers = computed(() => supplierStore.Suppliers);

const deleteRow = (id: string) => {
  supplierStore.deleteSupplier(id);
}
</script>

<template>
  <q-table
    title="Поставщики"
    :rows="suppliers"
    :columns="supplierColumns"
    row-key="supplierId"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" @click="deleteRow(props.row.supplierId)"/>
      </q-td>
    </template>
  </q-table>
</template>
