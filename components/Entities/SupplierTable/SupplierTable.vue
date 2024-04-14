<script setup lang="ts">
import { useSupplierStore } from "@/store/SupplierStore";
import type { Supplier } from "@/utils/types/store/SupplierTypes";
import { supplierColumns } from "./SupplierTableColums";

const supplierStore = useSupplierStore();

const suppliers = computed(() => supplierStore.Suppliers);
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
        <q-btn label="Edit" color="primary" />
      </q-td>
    </template>
  </q-table>
</template>
