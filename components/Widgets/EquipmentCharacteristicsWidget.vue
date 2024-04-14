<script setup lang="ts">
const dialog = ref(false);
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить характеристику типа"
    @click="dialog = true"
  />
  <FeaturesEquipmentCharacteristicsDialog v-model="dialog" />
  <EntitiesEquipmentCharacteristicTable />
</template>
