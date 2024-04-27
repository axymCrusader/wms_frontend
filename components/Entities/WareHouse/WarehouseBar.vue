<script setup lang="ts">
import { useWarehouseStore } from "@/store/WareHouseStore";
const warehouseStore = useWarehouseStore();
</script>

<template>
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Добавить склад"
    @click="warehouseStore.wareHouseDialogVisible = true"
  />
  <q-btn color="white" class="q-ml-sm" text-color="black" label="Фильтр" />
</template>
