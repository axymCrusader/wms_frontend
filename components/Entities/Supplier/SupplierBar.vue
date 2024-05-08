<script setup lang="ts">
import { useSupplierStore } from "@/store/SupplierStore";
const SupplierStore = useSupplierStore();
</script>

<template>
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Добавить поставщика"
    @click="SupplierStore.supplierDialogVisible = true"
  />
</template>
