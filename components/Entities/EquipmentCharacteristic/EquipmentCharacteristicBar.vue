<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
const equipmentCharacteristicStore = useEquipmentCharacteristicStore();
</script>

<template>
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Добавить характеристику типа"
    @click="
      equipmentCharacteristicStore.equipmentCharacteristicsDialogVisible = true
    "
  />
</template>
