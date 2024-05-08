<script setup lang="ts">
import { movementColumns } from "@/utils/TableColums/MovementTableColums";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useMovementStore } from "@/store/MovementsStore";
import { useWarehouseStore } from "@/store/WareHouseStore";
import { useAcceptОrderStore } from "@/store/AcceptОrderStore";
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { useShippingOrderStore } from "~/store/ShippingOrderStore";

const { AcceptОrders } = storeToRefs(useAcceptОrderStore());
const { Equipments } = storeToRefs(useEquipmentStore());
const { Movements } = storeToRefs(useMovementStore());
const { WareHouses } = storeToRefs(useWarehouseStore());

const filter = ref("");

const joinedData = computed(() =>
  Movements.value.map((move) => {
    const equipment = Equipments.value.find((e) => e.id === move.equipmentId);
    const wareHouse = WareHouses.value.find((wh) => wh.id === move.wareHouseId);
    const acceptОrder = AcceptОrders.value.find(
      (ao) => ao.id === move.documentId
    );

    return {
      wareHouseCode: wareHouse?.code,
      documentCode: acceptОrder?.code,
      equipmentCode: equipment ? equipment.code : "",
      equipmentQuantity: move.equipmentQuantity,
      date: move.date,
      type: move.type,
    };
  })
);
</script>

<template>
  <q-table
    title="Движение оборудования"
    :rows="joinedData"
    :columns="movementColumns"
    row-key="id"
    :filter="filter"
    flat
    sep-rows
  >
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
