<script setup lang="ts">
import { useCatalogStore } from "@/store/CatalogStore";
const catalogStore = useCatalogStore();
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить каталог"
    @click="catalogStore.catalogDialogVisible = true"
  />
  <FeaturesCatalogDialog />
  <EntitiesCatalogTable />
</template>
