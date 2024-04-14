<script setup lang="ts">
const dialog = ref(false);
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить поставщика"
    @click="dialog = true"
  />
  <FeaturesSupplierDialog v-model="dialog" />
  <EntitiesSupplierTable />
</template>
