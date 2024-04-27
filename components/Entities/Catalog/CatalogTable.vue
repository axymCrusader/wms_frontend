<script setup lang="ts">
import { useCatalogStore } from "@/store/CatalogStore";
import { useSupplierStore } from "@/store/SupplierStore";
import { catalogColumns } from "@/utils/TableColums/CatalogTableColums";
import { useEquipmentStore } from "@/store/EquipmentStore";

const { Catalogs } = storeToRefs(useCatalogStore());
const { Equipments } = storeToRefs(useEquipmentStore());
const { Suppliers } = storeToRefs(useSupplierStore());

const joinedData = computed(() =>
  Catalogs.value.map((catalog) => {
    const equipment = Equipments.value.find(
      (e) => e.id === catalog.equipmentId
    );
    const supplier = Suppliers.value.find((s) => s.id === catalog.supplierId);

    return {
      code: catalog.code,
      supplierName: supplier ? supplier.name : "",
      equipmentCode: equipment ? equipment.code : "",
      equipmentName: equipment ? equipment.name : "",
      price: catalog.price,
    };
  })
);
</script>

<template>
  <q-table
    title="Каталог оборудования"
    :rows="joinedData"
    :columns="catalogColumns"
    row-key="catalogId"
    flat
    sep-rows
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn label="Удалить" color="red" />
      </q-td>
    </template>
  </q-table>
</template>
