<script setup lang="ts">
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
const equipmentTypeStore = useEquipmentTypeStore();
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить тип оборудования"
    @click="equipmentTypeStore.equipmentTypeDialogVisible = true"
  />
  <FeaturesEquipmentTypeDialog />
  <EntitiesEquipmentTypeTable />
</template>
