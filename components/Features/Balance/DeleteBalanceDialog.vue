<script setup lang="ts">
import { useBalanceStore } from "@/store/BalanceStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";
import { useRelocationOrderStore } from "@/store/RelocationOrderStore";
import { useShippingOrderStore } from "@/store/ShippingOrderStore";
import { useMovementStore } from "@/store/MovementsStore";
import { useWarehouseStore } from "@/store/WareHouseStore";

const balanceStore = useBalanceStore();
const movmentStore = useMovementStore();

const { RelocationOrderLines, RelocationOrders } = storeToRefs(
  useRelocationOrderStore()
);
const { ShippingOrderLines, ShippingOrders } = storeToRefs(
  useShippingOrderStore()
);
const { Balances } = storeToRefs(balanceStore);
const { Movements } = storeToRefs(movmentStore);
const { WareHouses } = storeToRefs(useWarehouseStore());
const selectedShippingOrderIdCode = ref({
  label: "",
  value: 0,
});

const confirmedOrders = computed(() => {
  return ShippingOrders.value.filter(
    (so) => so.status === DOCUMENT_STATUSES.CONFIRMED
  );
});

const confirmedOrderOptions = computed(() => {
  return confirmedOrders.value.map((ro) => ({
    label: ro.code,
    value: ro.id,
  }));
});

const selectedShippingOrderLines = computed(() => {
  if (selectedShippingOrderIdCode.value) {
    return ShippingOrderLines.value.filter(
      (line) => line.id === selectedShippingOrderIdCode.value.value
    );
  }
  return [];
});

const tableData = selectedShippingOrderLines;

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

const deleteBalance = () => {
  const shippingOrderLines = ShippingOrderLines.value.filter(
    (s) => s.id === selectedShippingOrderIdCode.value.value
  );
  const shippingOrder = ShippingOrders.value.find(
    (s) => s.id === selectedShippingOrderIdCode.value.value
  );
  if (shippingOrder) {
    shippingOrder.status = DOCUMENT_STATUSES.SENT;

    let movementId = Movements.value.length + 1;

    const movements = shippingOrderLines.map((line) => {
      const balance = Balances.value.find(
        (b) =>
          b.equipmentCode === line.equipmentCode &&
          b.wareHouseId ===
            WareHouses.value.find(
              (w) => w.id === b.wareHouseId && w.type === "МТС"
            )?.id
      );
      if (balance) {
        balance.equipmentQuantity -= line.equipmentQuantity;
      }

      return {
        id: movementId++,
        ...{
          wareHouseId: shippingOrder.wareHouseId,
          documentId: line.id,
          equipmentId: line.equipmentId,
          type: "Отгрузка",
          equipmentQuantity: line.equipmentQuantity,
          date: new Date().toLocaleDateString("en-GB"),
        },
      };
    });

    movmentStore.addMovment(movements);
  }
};
</script>

<template>
  <q-dialog v-model="balanceStore.balanceDeleteDialogVisible">
    <q-card style="min-width: 1000px; min-height: 500px">
      <q-card-section>
        <div class="text-h6">Списание</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="selectedShippingOrderIdCode"
          :options="confirmedOrderOptions"
          label="Номер документа отгрузки"
        />
      </q-card-section>

      <q-card-section>
        <q-table :rows="tableData" :columns="columns" row-key="id" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Закрыть" color="primary" v-close-popup />
        <q-btn
          flat
          label="Сохранить"
          color="primary"
          v-close-popup
          @click="deleteBalance"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
