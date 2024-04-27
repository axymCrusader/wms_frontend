<script setup lang="ts">
import { acceptOrderColumns } from "@/utils/TableColums/AcceptOrderTableColums";
import { useAcceptОrderStore } from "@/store/AcceptОrderStore";
const acceptOrders = [
  {
    code: "--",
    status: "--",
    date: "--",
  },
];
const acceptОrderStore = useAcceptОrderStore();
</script>

<template>
  <q-table
    title="Заказы на приемку"
    :rows="acceptOrders"
    :columns="acceptOrderColumns"
    row-key="id"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          label="Просмотр"
          color="green"
          @click="acceptОrderStore.acceptОrderDialogVisible = true"
        />
      </q-td>
    </template>
  </q-table>
</template>
