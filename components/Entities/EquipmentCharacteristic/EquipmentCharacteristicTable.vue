<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import { equipmentCharacteristicColumns } from "@/utils/TableColums/EquipmentCharacteristicTableColums";

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();
const equipmentTypeStore = useEquipmentTypeStore();

const filter = ref("");

const { EquipmentCharacteristics, RelationshipsСharacteristicType } =
  storeToRefs(equipmentCharacteristicStore);

const { EquipmentTypes } = storeToRefs(equipmentTypeStore);

const equipmentTypesById = Object.fromEntries(
  EquipmentTypes.value.map((et) => [et.id, et])
);

const joinedData = computed(() =>
  EquipmentCharacteristics.value.map((ec) => {
    const relationships = RelationshipsСharacteristicType.value.filter(
      (r) => r.id === ec.id
    );
    const equipmentTypes = relationships.map(
      (r) => equipmentTypesById[r.equipmentTypeId]
    );

    return {
      id: ec.id,
      name: ec.name,
      equipmentTypesName: equipmentTypes.map((et) => et.name).join(", "),
    };
  })
);

const deleteRow = (id: number) => {
  equipmentCharacteristicStore.deleteEquipmentCharacteristic(id);
};
</script>

<template>
  <q-table
    title="Характеристики типов"
    :rows="joinedData"
    :columns="equipmentCharacteristicColumns"
    row-key="id"
    :filter="filter"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" @click="deleteRow(props.row.id)" />
        <q-btn class="q-ml-sm" label="Редактировать" color="green" />
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
