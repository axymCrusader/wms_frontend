<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { deliveryOrderColumns } from "@/utils/TableColums/DeliveryOrderTableColums";
import { useAcceptОrderStore } from "@/store/AcceptОrderStore";

const acceptОrderStore = useAcceptОrderStore();
const deliveryOrderStore = useDeliveryOrderStore();
const { DeliveryOrders } = storeToRefs(deliveryOrderStore);

const openDialog = (row) => {
  deliveryOrderStore.setOrderData(row);
  acceptОrderStore.acceptОrderAddDialogVisible = true;
};
const filter = ref("");
</script>

<template>
  <q-table
    title="Заказы на поставку"
    :rows="DeliveryOrders"
    :columns="deliveryOrderColumns"
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
