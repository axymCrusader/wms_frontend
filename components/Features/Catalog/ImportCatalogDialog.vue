<script setup lang="ts">
import { useCatalogStore } from "@/store/CatalogStore";

const catalogStore = useCatalogStore();
const file = ref(null);
</script>

<template>
  <q-dialog v-model="catalogStore.catalogImportDialogVisible" persistent>
    <q-card style="min-width: 300px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для импорта каталога
      </q-card-section>

      <q-card-section>
        <q-file v-model="file" label="Выберите файл" filled />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
