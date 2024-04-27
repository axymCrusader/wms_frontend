<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
const deliveryOrderStore = useDeliveryOrderStore();

const code = "";
const status = "";
const date = "";

const columns = [
  {
    name: "equipmentCode",
    required: true,
    label: "Номер оборудования",
    align: "left",
    field: "equipmentNumber",
  },
  {
    name: "equipmentName",
    required: true,
    label: "Наименование оборудования",
    align: "left",
    field: "equipmentName",
  },
  {
    name: "equipmentQuantity",
    required: true,
    label: "Количество",
    align: "left",
    field: "equipmentQuantity",
  },
];
const tableData = [
  { equipmentNumber: "123", equipmentName: "Оборудование 1", quantity: "10" },
  { equipmentNumber: "456", equipmentName: "Оборудование 2", quantity: "20" },
  { equipmentNumber: "789", equipmentName: "Оборудование 3", quantity: "30" },
];
</script>

<template>
  <q-dialog v-model="deliveryOrderStore.deliveryOrderShowDialogVisible">
    <q-card style="min-width: 1000px; min-height: 500px">
      <q-card-section>
        <div class="text-h6">Детали документа</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled v-model="code" label="Номер документа" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select filled v-model="status" label="Статус документа" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input readonly filled v-model="date" label="Дата" />
      </q-card-section>

      <q-card-section>
        <q-table :rows="tableData" :columns="columns" row-key="id" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Закрыть" color="primary" v-close-popup />
        <q-btn flat label="Изменить" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
