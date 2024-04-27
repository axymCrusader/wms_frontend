<script setup lang="ts">
import { useEquipmentStore } from "@/store/EquipmentStore";
const equipmentStore = useEquipmentStore();
</script>

<template>
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Добавить оборудование"
    @click="equipmentStore.equipmentAddDialogVisible = true"
  />
  <q-btn color="white" class="q-ml-sm" text-color="black" label="Фильтр" />
</template>
