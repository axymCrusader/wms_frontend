<script setup lang="ts">
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useCatalogStore } from "@/store/CatalogStore";
import { handbookTableColums } from "@/utils/TableColums/HandbookTableColums";

const { Equipments, Handbooks } = storeToRefs(useEquipmentStore());
const { Catalogs } = storeToRefs(useCatalogStore());

const filter = ref("");

const joinedData = computed(() =>
  Handbooks.value.map((hb) => {
    const equipment = Equipments.value.find((e) => e.id === hb.id);
    const catalog = Catalogs.value.find((ct) => ct.id === hb.catalogId);

    return {
      code: equipment?.code,
      name: equipment ? equipment.name : "",
      price: catalog ? catalog.price : "",
    };
  })
);

const deleteRow = (id: number) => {};
</script>

<template>
  <q-table
    title="Справочники"
    :rows="joinedData"
    :columns="handbookTableColums"
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
