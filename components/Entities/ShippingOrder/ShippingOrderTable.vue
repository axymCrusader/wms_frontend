<script setup lang="ts">
import { shippingOrderColumns } from "@/utils/TableColums/ShippingOrderTableColums";
import { useAcceptОrderStore } from "@/store/AcceptОrderStore";
import { useShippingOrderStore } from "@/store/ShippingOrderStore";
const shippingOrderStore = useShippingOrderStore();
const { ShippingOrders } = storeToRefs(shippingOrderStore);
const acceptOrderStore = useAcceptОrderStore();

const openDialog = (row) => {
  shippingOrderStore.setOrderData(row);
  acceptOrderStore.acceptОrder_AddDialogVisible = true;
};

const filter = ref("");
</script>

<template>
  <q-table
    title="Заказы на отгрузку"
    :rows="ShippingOrders"
    :columns="shippingOrderColumns"
    row-key="id"
    flat
    :filter="filter"
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          class="q-ml-sm"
          label="Подтвердить"
          color="green"
          @click="openDialog(props.row)"
        />
        <q-btn class="q-ml-sm" label="Просмотр" color="green" />
      </q-td>
    </template>
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Поиск"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>
