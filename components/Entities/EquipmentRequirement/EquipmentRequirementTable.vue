<script setup lang="ts">
import { equipmentRequirementsColumns } from "@/utils/TableColums/EquipmentRequirementsTableColums";
import { useEquipmentRequirementStore } from "@/store/EquipmentRequirementStore";
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
const { deliveryOrderAddDialogBasedOnRequirementVisible } = storeToRefs(
  useDeliveryOrderStore()
);
const equipmentRequirementStore = useEquipmentRequirementStore();
const { EquipmentRequirements } = storeToRefs(equipmentRequirementStore);
</script>

<template>
  <q-table
    title="Потребность в оборудовании"
    :rows="EquipmentRequirements"
    :columns="equipmentRequirementsColumns"
    row-key="id"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" />
        <q-btn
          class="q-ml-sm"
          label="Создать заказ"
          color="green"
          @click="deliveryOrderAddDialogBasedOnRequirementVisible = true"
        />
      </q-td>
    </template>
  </q-table>
</template>
