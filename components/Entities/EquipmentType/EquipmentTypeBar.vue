<script setup lang="ts">
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
const equipmentTypeStore = useEquipmentTypeStore();
</script>

<template>
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Добавить тип"
    @click="equipmentTypeStore.equipmentTypeDialogVisible = true"
  />
</template>
