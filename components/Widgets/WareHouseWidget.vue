<script setup lang="ts">
const dialog = ref(false);
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Добавить склад"
    @click="dialog = true"
  />
  <FeaturesWareHouseDialog v-model="dialog" />
  <EntitiesWareHouseTableWarehouseTable />
</template>
