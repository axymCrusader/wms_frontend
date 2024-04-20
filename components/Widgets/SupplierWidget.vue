<script setup lang="ts">
import { useSupplierStore } from "@/store/SupplierStore";
const supplierStore = useSupplierStore();
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить поставщика"
    @click="supplierStore.supplierDialogVisible = true"
  />
  <FeaturesSupplierDialog />
  <EntitiesSupplierTable />
</template>
