<script setup lang="ts">
const dialog = ref(false);
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить каталог"
    @click="dialog = true"
  />
  <FeaturesCatalogDialog v-model="dialog" />
  <EntitiesCatalogTable />
</template>
