<script setup lang="ts">
import { useEquipmentStore } from "@/store/EquipmentStore";
import { equipmentColumns } from "@/utils/TableColums/EquipmentTableColums";

const equipmentStore = useEquipmentStore();
const { Equipments, equipmentShowDialogVisible } = storeToRefs(equipmentStore);

const deleteRow = (id: number) => {
  equipmentStore.deleteEquipment(id);
};
</script>

<template>
  <q-table
    title="Оборудование"
    :rows="Equipments"
    :columns="equipmentColumns"
    row-key="id"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" @click="deleteRow(props.row.id)" />
        <q-btn
          class="q-ml-sm"
          label="Просмотр"
          color="green"
          @click="equipmentShowDialogVisible = true"
        />
      </q-td>
    </template>
  </q-table>
</template>
