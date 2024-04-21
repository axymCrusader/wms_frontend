<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
const deliveryOrderStore = useDeliveryOrderStore();
</script>

<template>
  <q-btn
    color="white"
    text-color="black"
    label="Создать заказ"
    @click="deliveryOrderStore.deliveryOrderDialogVisible = true"
  />
  <FeaturesDocumentsDeliveryOrderDialog />
  <EntitiesEquipmentRequirementsTable />
</template>
