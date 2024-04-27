<script setup lang="ts">
import { shippingOrderColumns } from "@/utils/TableColums/ShippingOrderTableColums";
import { useShippingOrderStore } from "@/store/ShippingOrderStore";
const shippingOrderStore = useShippingOrderStore();

const shippingOrders = [
  {
    code: "--",
    status: "--",
    date: "--",
  },
];
</script>

<template>
  <q-table
    title="Заказы на отгрузку"
    :rows="shippingOrders"
    :columns="shippingOrderColumns"
    row-key="id"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          label="Просмотр"
          color="green"
          @click="shippingOrderStore.shippingOrderDialogVisible = true"
        />
      </q-td>
    </template>
  </q-table>
</template>
