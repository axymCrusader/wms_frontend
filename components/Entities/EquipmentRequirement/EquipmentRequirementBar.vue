<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
const deliveryOrderStore = useDeliveryOrderStore();
</script>

<template>
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Создать заказ на поставку"
    @click="
      deliveryOrderStore.deliveryOrderAddDialogBasedOnForecastVisible = true
    "
  />
</template>
