<script setup lang="ts">
import { useCatalogStore } from "@/store/CatalogStore";
const catalogStore = useCatalogStore();
</script>

<template>
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Добавить каталог"
    @click="catalogStore.catalogAddDialogVisible = true"
  />
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Импортировать"
    @click="catalogStore.catalogImportDialogVisible = true"
  />
</template>
