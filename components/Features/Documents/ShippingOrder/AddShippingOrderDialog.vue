<script setup lang="ts">
import { useShippingOrderStore } from "@/store/ShippingOrderStore";
import { useRelocationOrderStore } from "@/store/RelocationOrderStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";

const shippingOrderStore = useShippingOrderStore();
const { shippingOrderAddDialogVisible, ShippingOrderLines, ShippingOrders } =
  storeToRefs(shippingOrderStore);
const { currentOrder, RelocationOrderLines, RelocationOrders } = storeToRefs(
  useRelocationOrderStore()
);

const shippingOrder = ref({
  code: "",
});

const relocationOrderId = computed(() => currentOrder.value?.id);

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

const filteredRelocationOrderLines = computed(() => {
  return RelocationOrderLines.value.filter(
    (line) => line.id === relocationOrderId.value
  );
});

const addShippingOrder = () => {
  const relocationOrderLines = RelocationOrderLines.value.filter(
    (r) => r.id === relocationOrderId.value
  );
  const relocationOrder = RelocationOrders.value.find(
    (r) => r.id === relocationOrderId.value
  );

  if (relocationOrder) {
    relocationOrder.status = DOCUMENT_STATUSES.CONFIRMED;
    const newOrder = Object.assign({}, relocationOrder);

    newOrder.id = ShippingOrders.value.length + 1;
    newOrder.code = shippingOrder.value.code;
    newOrder.date = new Date().toLocaleDateString("en-GB");
    newOrder.status = DOCUMENT_STATUSES.CREATED;

    shippingOrderStore.addShippingОrder(newOrder, relocationOrderLines);
  }
};
</script>

<template>
  <q-dialog v-model="shippingOrderAddDialogVisible">
    <q-card style="min-width: 1000px; min-height: 500px">
      <q-card-section>
        <div class="text-h6">Создание документа на отгрузку</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled v-model="shippingOrder.code" label="Номер документа" />
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="filteredRelocationOrderLines"
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
          @click="addShippingOrder"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
