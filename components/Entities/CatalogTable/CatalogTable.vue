<script setup lang="ts">
import { useCatalogStore } from "@/store/CatalogStore";
import { useSupplierStore } from "@/store/SupplierStore";
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import { catalogColumns } from "./CatalogTableColums";
import type {
  Catalog,
  Equipment,
  Property,
} from "@/utils/types/store/CatalogTypes";
import type { Supplier } from "@/utils/types/store/SupplierTypes";
import type { EquipmentCharacteristic } from "@/utils/types/store/EquipmentCharacteristicTypes";

const catalogStore = useCatalogStore();
const supplierStore = useSupplierStore();
const equipmentCharacteristicStore = useEquipmentCharacteristicStore();

const suppliers = supplierStore.Suppliers;
const characteristics = equipmentCharacteristicStore.EquipmentCharacteristics;
const catalogs = catalogStore.Catalogs;
const equipments = catalogStore.Equipments;
const properties = catalogStore.Properties;

const joinedData = catalogs.map((catalog: any) => {
  const equipment = equipments.find(
    (e: any) => e.equipmentId === catalog.catalogEquipmentId
  );
  const supplier = suppliers.find(
    (s: any) => s.supplierId === catalog.catalogSupplierId
  );

  return {
    catalogId: catalog.catalogId,
    catalogSupplierName: supplier ? supplier.supplierName : "",
    catalogEquipmentId: equipment ? equipment.equipmentId : "",
    equipmentName: equipment ? equipment.equipmentName : "",
    catalogPrice: catalog.catalogPrice,
  };
});
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
