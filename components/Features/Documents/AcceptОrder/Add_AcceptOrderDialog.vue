<script setup lang="ts">
import { useShippingOrderStore } from "@/store/ShippingOrderStore";
import { useAcceptОrderStore } from "@/store/AcceptОrderStore";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";

const shippingOrderStore = useShippingOrderStore();
const acceptОrderStore = useAcceptОrderStore();

const { AcceptОrders, acceptОrder_AddDialogVisible } =
  storeToRefs(acceptОrderStore);
const { currentOrder, ShippingOrderLines, ShippingOrders } =
  storeToRefs(shippingOrderStore);

const shippingOrder = ref({
  code: "",
});

const shippingOrderId = computed(() => currentOrder.value?.id);

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

const filteredShippingOrderLines = computed(() => {
  return ShippingOrderLines.value.filter(
    (line) => line.id === shippingOrderId.value
  );
});

const addAcceptOrder = () => {
  const shippingOrderLines = ShippingOrderLines.value.filter(
    (d) => d.id === shippingOrderId.value
  );
  const shippingOrder = ShippingOrders.value.find(
    (so) => so.id === shippingOrderId.value
  );

  if (shippingOrder) {
    if (shippingOrder && shippingOrder.status === DOCUMENT_STATUSES.CREATED) {
      shippingOrder.status = DOCUMENT_STATUSES.CONFIRMED;
    }

    const newOrder = Object.assign({}, shippingOrder);

    newOrder.id = ShippingOrders.value.length + 1;
    newOrder.code = shippingOrder.code;
    newOrder.date = new Date().toLocaleDateString("en-GB");
    newOrder.status = DOCUMENT_STATUSES.CREATED;

    acceptОrderStore.addAcceptОrder(newOrder, shippingOrderLines);
  }
};
</script>

<template>
  <q-dialog v-model="acceptОrder_AddDialogVisible">
    <q-card style="min-width: 1000px; min-height: 500px">
      <q-card-section>
        <div class="text-h6">Создание документа на приемку</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled v-model="shippingOrder.code" label="Номер документа" />
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="filteredShippingOrderLines"
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
