<script setup lang="ts">
const dialog = ref(false);
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить тип оборудования"
    @click="dialog = true"
  />
  <FeaturesEquipmentTypeDialog v-model="dialog" />
  <EntitiesEquipmentTypeTable />
</template>
