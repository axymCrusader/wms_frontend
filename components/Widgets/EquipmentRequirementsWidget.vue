<script setup lang="ts">
const dialog = ref(false);
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Создать заказ"
    @click="dialog = true"
  />
  <FeaturesEquipmentRequirementsDialog v-model="dialog" />
  <EntitiesEquipmentRequirementsTable />
</template>
