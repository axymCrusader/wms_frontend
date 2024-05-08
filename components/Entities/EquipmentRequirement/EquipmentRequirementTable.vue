<script setup lang="ts">
import { equipmentRequirementsColumns } from "@/utils/TableColums/EquipmentRequirementsTableColums";
import { useEquipmentRequirementStore } from "@/store/EquipmentRequirementStore";
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";

const equipmentRequirementStore = useEquipmentRequirementStore();
const { EquipmentRequirements } = storeToRefs(equipmentRequirementStore);
const deliveryOrderStore = useDeliveryOrderStore();

const openDialog = (row) => {
  equipmentRequirementStore.setRequirementData(row);
  deliveryOrderStore.deliveryOrderAddDialogBasedOnRequirementVisible = true;
};
const filter = ref("");
</script>

<template>
  <q-table
    title="Потребность в оборудовании"
    :rows="EquipmentRequirements"
    :columns="equipmentRequirementsColumns"
    row-key="id"
    flat
    :filter="filter"
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ml-sm" label="Редактировать" color="green" />
        <q-btn class="q-ml-sm" label="Удалить" color="red" />
        <q-btn
          class="q-ml-sm"
          label="Создать заказ"
          color="green"
          @click="openDialog(props.row)"
        />
      </q-td>
    </template>
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
