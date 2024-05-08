<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { useAcceptОrderStore } from "@/store/AcceptОrderStore";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";

const deliveryOrderStore = useDeliveryOrderStore();
const acceptОrderStore = useAcceptОrderStore();
const { AcceptОrders, acceptОrderAddDialogVisible } =
  storeToRefs(acceptОrderStore);
const { currentOrder, DeliveryOrderLines, DeliveryOrders } =
  storeToRefs(deliveryOrderStore);

const acceptOrder = ref({
  code: "",
});

const deliveryOrderId = computed(() => currentOrder.value?.id);

const columns = [
  {
    name: "equipmentCode",
    required: true,
    label: "Номер оборудования",
    align: "left",
    field: "equipmentCode",
  },
  {
    name: "equipmentQuantity",
    required: true,
    label: "Количество",
    align: "left",
    field: "equipmentQuantity",
  },
];

const filteredDeliveryOrderLines = computed(() => {
  return DeliveryOrderLines.value.filter(
    (line) => line.id === deliveryOrderId.value
  );
});

const addAcceptOrder = () => {
  const deliveryOrderLines = DeliveryOrderLines.value.filter(
    (d) => d.id === deliveryOrderId.value
  );
  const deliveryOrder = DeliveryOrders.value.find(
    (d) => d.id === deliveryOrderId.value
  );

  if (deliveryOrder) {
    deliveryOrder.status = DOCUMENT_STATUSES.CONFIRMED;
    const newOrder = Object.assign({}, deliveryOrder);

    newOrder.id = AcceptОrders.value.length + 1;
    newOrder.code = acceptOrder.value.code;
    newOrder.date = new Date().toLocaleDateString("en-GB");
    newOrder.status = DOCUMENT_STATUSES.CREATED;

    acceptОrderStore.addAcceptОrder(newOrder, deliveryOrderLines);
  }
};
</script>

<template>
  <q-dialog v-model="acceptОrderAddDialogVisible">
    <q-card style="min-width: 1000px; min-height: 500px">
      <q-card-section>
        <div class="text-h6">Создание документа на приемку</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled v-model="acceptOrder.code" label="Номер документа" />
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="filteredDeliveryOrderLines"
          :columns="columns"
          row-key="id"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Закрыть" color="primary" v-close-popup />
        <q-btn
          flat
          label="Создать"
          color="primary"
          v-close-popup
          @click="addAcceptOrder"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
