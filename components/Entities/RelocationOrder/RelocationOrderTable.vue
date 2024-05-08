<script setup lang="ts">
import { relocationOrderColumns } from "@/utils/TableColums/RelocationOrderTableColums";
import { useRelocationOrderStore } from "@/store/RelocationOrderStore";
import { useShippingOrderStore } from "@/store/ShippingOrderStore";

const shippingOrderStore = useShippingOrderStore();
const relocationOrderStore = useRelocationOrderStore();
const { RelocationOrders } = storeToRefs(relocationOrderStore);

const openDialog = (row) => {
  relocationOrderStore.setOrderData(row);
  shippingOrderStore.shippingOrderAddDialogVisible = true;
};
const filter = ref("");
</script>

<template>
  <q-table
    title="Заказы на перемещение"
    :rows="RelocationOrders"
    :columns="relocationOrderColumns"
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
        <q-btn class="q-ml-sm" label="Просмотр" color="green" @click="" />
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
