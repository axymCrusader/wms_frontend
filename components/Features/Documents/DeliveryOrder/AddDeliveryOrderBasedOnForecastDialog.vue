<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { useWarehouseStore } from "@/store/WareHouseStore";
import { useSupplierStore } from "@/store/SupplierStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";
import { useCatalogStore } from "@/store/CatalogStore";

import type { ICatalog } from "@/utils/types/store/CatalogTypes";

const deliveryOrderStore = useDeliveryOrderStore();
const { Suppliers } = storeToRefs(useSupplierStore());
const { WareHouses } = storeToRefs(useWarehouseStore());
const { Catalogs } = storeToRefs(useCatalogStore());

const deliveryOrder = ref({
  id: 0,
  code: "",
  status: "",
  date: "",
  wareHouseId: 0,
  equipmentRequirementId: null,
});

const selectedWareHouseIdName = ref({
  label: "",
  value: 0,
});

const wareHouseOptions = WareHouses.value.map((wh) => ({
  label: wh.name,
  value: wh.id,
}));

const catalogOptions = Catalogs.value.map((ct) => ({
  label: ct.code,
  value: ct.id,
}));

const table = ref<{
  title: string;
  columns: { name: string; label: string; align: string; field: string }[];
  rows: {
    catalogCode: string;
    equipmentCode: string;
    equipmentName: string;
    equipmentPrice: number;
    equipmentQuantity: number;
  }[];
}>({
  title: "Строки заказа",
  columns: [
    {
      name: "catalogCode",
      label: "Номер каталога",
      align: "left",
      field: "catalogCode",
    },
    {
      name: "equipmentCode",
      label: "Номер оборудования",
      align: "left",
      field: "equipmentCode",
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
      name: "equipmentQuantity",
      label: "Кол-во",
      align: "left",
      field: "equipmentQuantity",
    },
  ],
  rows: [],
});

const addRow = () => {
  table.value.rows.push({
    catalogCode: "",
    equipmentCode: "",
    equipmentName: "",
    equipmentPrice: 0,
    equipmentQuantity: 0,
  });
};
const removeRow = () => {
  if (table.value.rows.length > 0) {
    table.value.rows.pop();
  }
};

const onSubmit = () => {
  deliveryOrder.value.status = DOCUMENT_STATUSES.CREATED;
  deliveryOrder.value.date = new Date().toISOString();
  deliveryOrder.value.wareHouseId = selectedWareHouseIdName.value.value;
  // add rows DeliveryOrder
  deliveryOrderStore.addDeliveryOrder(deliveryOrder.value);
  // add create AcceptОrder
  deliveryOrder.value = {
    id: 0,
    code: "",
    status: "",
    date: "",
    wareHouseId: 0,
    equipmentRequirementId: null,
  };
  selectedWareHouseIdName.value = {
    label: "",
    value: 0,
  };
};
</script>

<template>
  <q-dialog
    v-model="deliveryOrderStore.deliveryOrderAddDialogBasedOnForecastVisible"
    persistent
  >
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для создания заказа
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="deliveryOrder.code" label="Номер заказа" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="selectedWareHouseIdName"
          :options="wareHouseOptions"
          option-value="value"
          option-label="label"
          label="Склад"
        />
      </q-card-section>

      <div class="q-pa-md">
        <q-toolbar>
          <q-toolbar-title>
            {{ table.title }}
          </q-toolbar-title>
          <q-space />
        </q-toolbar>
        <q-table flat bordered :rows="table.rows" :columns="table.columns">
          <template v-slot:top>
            <q-btn color="green" label="Добавить строку" @click="addRow" />
            <q-btn
              v-if="table.rows.length !== 0"
              class="q-ml-sm"
              color="red"
              label="Удалить строку"
              @click="removeRow"
            />
            <q-space />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="catalogCode" :props="props">
                <q-select
                  filled
                  v-model="props.row.catalogCode"
                  :options="catalogOptions"
                  option-value="value"
                  option-label="label"
                />
              </q-td>
              <q-td key="equipmentCode" :props="props">
                <q-select
                  filled
                  v-model="props.row.equipmentCode"
                  :options="['1', '2']"
                />
              </q-td>
              <q-td key="equipmentName" :props="props">
                <q-input v-model="props.row.equipmentName" />
              </q-td>
              <q-td key="equipmentPrice" :props="props">
                <q-input v-model.number="props.row.equipmentPrice" />
              </q-td>
              <q-td key="equipmentQuantity" :props="props">
                <q-input v-model.number="props.row.equipmentQuantity" />
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
