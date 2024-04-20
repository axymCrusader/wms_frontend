<script setup lang="ts">
import { useWarehouseStore } from "@/store/WareHouseStore";
const warehouseStore = useWarehouseStore();
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить склад"
    @click="warehouseStore.wareHouseDialogVisible = true"
  />
  <FeaturesWareHouseDialog />
  <EntitiesWareHouseTableWarehouseTable />
</template>
