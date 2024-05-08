<script setup lang="ts">
import { acceptOrderColumns } from "@/utils/TableColums/AcceptOrderTableColums";
import { useAcceptОrderStore } from "@/store/AcceptОrderStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";

const { AcceptОrders } = storeToRefs(useAcceptОrderStore());
const confirmOrder = (id: number) => {
  const acceptОrder = AcceptОrders.value.find((ao) => ao.id === id);
  if (acceptОrder && acceptОrder.status === DOCUMENT_STATUSES.CREATED) {
    acceptОrder.status = DOCUMENT_STATUSES.CONFIRMED;
  }
};

const receivedOrder = (id: number) => {
  const acceptОrder = AcceptОrders.value.find((ao) => ao.id === id);
  if (acceptОrder && acceptОrder.status === DOCUMENT_STATUSES.CONFIRMED) {
    acceptОrder.status = DOCUMENT_STATUSES.RECEIVED;
  }
};
</script>

<template>
  <q-table
    title="Заказы на приемку"
    :rows="AcceptОrders"
    :columns="acceptOrderColumns"
    row-key="id"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ml-sm" label="Просмотр" color="green" />
        <q-btn
          class="q-ml-sm"
          label="Подтвердить"
          color="green"
          @click="confirmOrder(props.row.id)"
        />
        <q-btn
          class="q-ml-sm"
          label="Получено"
          color="green"
          @click="receivedOrder(props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>
