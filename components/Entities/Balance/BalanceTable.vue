<script setup lang="ts">
import { balanceColumns } from "@/utils/TableColums/BalanceTableColums";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useWarehouseStore } from "@/store/WareHouseStore";
import { useBalanceStore } from "@/store/BalanceStore";

const { Balances } = storeToRefs(useBalanceStore());
const { Equipments } = storeToRefs(useEquipmentStore());
const { WareHouses } = storeToRefs(useWarehouseStore());

const joinedData = computed(() =>
  Balances.value.map((balance) => {
    const equipment = Equipments.value.find(
      (e) => e.id === balance.equipmentId
    );
    const warehouse = WareHouses.value.find(
      (wh) => wh.id === balance.wareHouseId
    );
    return {
      warehouseName: warehouse?.name,
      equipmentCode: equipment?.code,
      equipmentName: equipment?.name,
      date: balance.date,
      equipmentQuantity: balance.equipmentQuantity,
    };
  })
);
const filter = ref("");
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Остатки"
      :rows="joinedData"
      :columns="balanceColumns"
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
  </div>
</template>
