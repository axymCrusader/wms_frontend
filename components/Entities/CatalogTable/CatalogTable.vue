<script setup lang="ts">
import { useCatalogStore } from "@/store/CatalogStore";
import type { Catalog } from "@/utils/types/store/CatalogTypes";
import { catalogColumns } from "./CatalogTableColums";

const catalogStore = useCatalogStore();

const catalogs = computed(() => catalogStore.Catalogs);
</script>

<template>
  <q-table
    title="Каталог оборудования"
    :rows="catalogs"
    :columns="catalogColumns"
    row-key="equipmentTypeId"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Edit" color="primary" />
      </q-td>
    </template>
  </q-table>
</template>
