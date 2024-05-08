<script setup lang="ts">
import { useBalanceStore } from "@/store/BalanceStore";
import { useAcceptОrderStore } from "@/store/AcceptОrderStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { useMovementStore } from "@/store/MovementsStore";

const balanceStore = useBalanceStore();
const movmentStore = useMovementStore();

const { Balances } = storeToRefs(balanceStore);
const { AcceptОrderLines, AcceptОrders } = storeToRefs(useAcceptОrderStore());
const { DeliveryOrders } = storeToRefs(useDeliveryOrderStore());
const { Movements } = storeToRefs(movmentStore);

const selectedAcceptOrderIdCode = ref({
  label: "",
  value: 0,
});

const receivedOrders = computed(() => {
  return AcceptОrders.value.filter(
    (ao) => ao.status === DOCUMENT_STATUSES.RECEIVED
  );
});

const receivedOrderOptions = computed(() => {
  return receivedOrders.value.map((ro) => ({
    label: ro.code,
    value: ro.id,
  }));
});

const selectedAcceptOrderLines = computed(() => {
  if (selectedAcceptOrderIdCode.value) {
    return AcceptОrderLines.value.filter(
      (line) => line.id === selectedAcceptOrderIdCode.value.value
    );
  }
  return [];
});

const tableData = selectedAcceptOrderLines;

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

const addBalance = () => {
  const acceptOrderLines = AcceptОrderLines.value.filter(
    (d) => d.id === selectedAcceptOrderIdCode.value.value
  );
  const acceptOrder = AcceptОrders.value.find(
    (d) => d.id === selectedAcceptOrderIdCode.value.value
  );
  if (acceptOrder) {
    acceptOrder.status = DOCUMENT_STATUSES.COMPLETED;

    let balanceId = Balances.value.length + 1;
    let movementId = Movements.value.length + 1;

    const balances = acceptOrderLines.map((line) => ({
      id: balanceId++,
      ...{
        wareHouseId: acceptOrder.wareHouseId,
        equipmentCode: line.equipmentCode,
        equipmentId: line.equipmentId,
        equipmentQuantity: line.equipmentQuantity,
        date: new Date().toLocaleDateString("en-GB"),
      },
    }));

    const movements = acceptOrderLines.map((line) => ({
      id: movementId++,
      ...{
        wareHouseId: acceptOrder.wareHouseId,
        documentId: line.id,
        equipmentId: line.equipmentId,
        type: "Приемка",
        equipmentQuantity: line.equipmentQuantity,
        date: new Date().toLocaleDateString("en-GB"),
      },
    }));
    movmentStore.addMovment(movements);
    balanceStore.addBalance(balances);
  }
};
</script>

<template>
  <q-dialog v-model="balanceStore.balanceAddDialogVisible">
    <q-card style="min-width: 1000px; min-height: 500px">
      <q-card-section>
        <div class="text-h6">Оприходование</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="selectedAcceptOrderIdCode"
          :options="receivedOrderOptions"
          label="Номер документа приемки"
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
          @click="addBalance"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
