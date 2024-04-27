<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { deliveryOrderColumns } from "@/utils/TableColums/DeliveryOrderTableColums";
const deliveryOrderStore = useDeliveryOrderStore();

const deliveryOrders = [
  {
    code: "--",
    status: "--",
    date: "--",
  },
];
</script>

<template>
  <q-table
    title="Заказы на поставку"
    :rows="deliveryOrders"
    :columns="deliveryOrderColumns"
    row-key="id"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          label="Просмотр"
          color="green"
          @click="deliveryOrderStore.deliveryOrderShowDialogVisible = true"
        />
      </q-td>
    </template>
  </q-table>
</template>
