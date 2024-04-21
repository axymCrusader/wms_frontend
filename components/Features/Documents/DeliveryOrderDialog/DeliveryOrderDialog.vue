<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { useWarehouseStore } from "@/store/WareHouseStore";
import { useSupplierStore } from "@/store/SupplierStore";
import { useEquipmentRequirementStore } from "@/store/EquipmentRequirementStore";
import { DocumentStatuses } from "../DocumentStatus";
import { useCatalogStore } from "@/store/CatalogStore";

import type { Catalog } from "@/utils/types/store/CatalogTypes";

const deliveryOrderStore = useDeliveryOrderStore();
const supplierStore = useSupplierStore();
const warehouseStore = useWarehouseStore();
const EquipmentRequirementStore = useEquipmentRequirementStore();
const catalogStore = useCatalogStore();

const deliveryOrder = ref({
  deliveryOrderId: "",
  deliveryOrderStatus: "",
  deliveryOrderDate: "",
  deliveryOrderEquipmentRequirementId: "",
  deliveryOrderWareHouseId: "",
});

const wareHouseOptions = warehouseStore.WareHouses.map(
  (wh: { wareHouseId: string; wareHouseName: string }) => ({
    label: wh.wareHouseName,
    value: wh.wareHouseId,
  })
);

const catalogOptionsIds = computed(() => {
  return catalogStore.Catalogs.map((catalog: { catalogId: string }) => ({
    label: catalog.catalogId,
    value: catalog.catalogId,
  }));
});

const equipmentOptions = computed(() => {
  const selectedCatalogId = table.value.rows[0].catalogId;
  if (selectedCatalogId) {
    return catalogStore.getEquipmentNamesByCatalogId(selectedCatalogId);
  } else {
    return [];
  }
});

const table = ref<{
  title: string;
  columns: { name: string; label: string; align: string; field: string }[];
  rows: {
    catalogId: string;
    equipmentName: string;
    equipmentPrice: string;
    quantity: number;
  }[];
}>({
  title: "Строки заказа",
  columns: [
    {
      name: "catalogId",
      label: "Номер каталога",
      align: "left",
      field: "catalogId",
    },
    {
      name: "equipmentName",
      label: "Наименование оборудования",
      align: "left",
      field: "equipmentName",
    },
    {
      name: "equipmentPrice",
      label: "Цена ед. оборудования",
      align: "left",
      field: "equipmentPrice",
    },
    {
      name: "quantity",
      label: "Кол-во",
      align: "left",
      field: "quantity",
    },
  ],
  rows: [],
});

const addRow = () => {
  table.value.rows.push({
    catalogId: "",
    equipmentName: "",
    equipmentPrice: "",
    quantity: 0,
  });
};
const onSubmit = () => {
  deliveryOrder.value.deliveryOrderStatus = DocumentStatuses.CREATED;
  deliveryOrder.value.deliveryOrderDate = new Date().toISOString();
  // add rows DeliveryOrder
  deliveryOrderStore.addDeliveryOrder(deliveryOrder.value);
  deliveryOrder.value = {
    deliveryOrderId: "",
    deliveryOrderStatus: "",
    deliveryOrderDate: "",
    deliveryOrderEquipmentRequirementId: "",
    deliveryOrderWareHouseId: "",
  };
};
</script>

<template>
  <q-dialog v-model="deliveryOrderStore.deliveryOrderDialogVisible" persistent>
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для создания заказа
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="deliveryOrder.deliveryOrderId"
          label="Номер заказа"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="deliveryOrder.deliveryOrderWareHouseId"
          :options="wareHouseOptions"
          label="Склад"
        />
      </q-card-section>

      <div class="q-pa-md">
        <q-toolbar>
          <q-toolbar-title>
            {{ table.title }}
          </q-toolbar-title>
          <q-space />
          <q-btn flat label="Добавить строку" @click="() => addRow()" />
        </q-toolbar>
        <q-table
          flat
          bordered
          :rows="table.rows"
          :columns="table.columns"
          row-key="id"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="catalogId" :props="props">
                <q-select
                  v-model="props.row.catalogId"
                  :options="catalogOptionsIds"
                  label="Номер каталога"
                />
              </q-td>
              <q-td key="equipmentName" :props="props">
                <q-select
                  v-model="props.row.equipmentName"
                  :options="equipmentOptions"
                  label="Наименование оборудования"
                />
              </q-td>
              <q-td key="equipmentPrice" :props="props">
                {{ props.row.equipmentPrice }}
              </q-td>
              <q-td key="quantity" :props="props">
                <q-input v-model="props.row.quantity" type="number" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
