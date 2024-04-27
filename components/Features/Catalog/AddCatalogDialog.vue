<script setup lang="ts">
import { useCatalogStore } from "@/store/CatalogStore";
import { useSupplierStore } from "@/store/SupplierStore";
import { useEquipmentStore } from "@/store/EquipmentStore";
import type { ICatalog } from "@/utils/types/store/CatalogTypes";
const catalogStore = useCatalogStore();

const { Catalogs, catalogAddDialogVisible } = storeToRefs(catalogStore);
const { Equipments } = storeToRefs(useEquipmentStore());
const { Suppliers } = storeToRefs(useSupplierStore());

const catalog = ref({
  code: "",
});

const supplierOptions = Suppliers.value.map((sup) => ({
  label: sup.name,
  value: sup.id,
}));

const selectedSupplierIdName = ref({
  label: "",
  value: 0,
});

const equipmentOptions = Equipments.value.map((eq) => ({
  label: eq.code,
  value: eq.id,
}));

const table = ref({
  title: "Оборудование",
  columns: [
    {
      name: "code",
      label: "Номер оборудования",
      align: "left",
      field: "code",
    },
    {
      name: "name",
      label: "Наименование оборудования",
      align: "left",
      field: "name",
    },
    {
      name: "price",
      label: "Цена",
      align: "left",
      field: "price",
    },
  ],
  rows: [] as { code: number; name: string; price: number }[],
});

const addCatalog = () => {
  const newCatalogs: ICatalog[] = [];
  table.value.rows.forEach((row) => {
    const newCatalog = {
      id: Catalogs.value.length + 1,
      code: catalog.value.code,
      supplierId: selectedSupplierIdName.value.value,
      equipmentId: row.code.value,
      price: row.price,
    };
    newCatalogs.push(newCatalog);
  });
  catalogStore.addCatalog(newCatalogs);
  table.value.rows = [];
  selectedSupplierIdName.value = { label: "", value: 0 };
};

const addRow = () => {
  table.value.rows.push({
    code: 0,
    name: "",
    price: 0,
  });
};
const removeRow = () => {
  if (table.value.rows.length > 0) {
    table.value.rows.pop();
  }
};
</script>

<template>
  <q-dialog v-model="catalogAddDialogVisible" persistent>
    <q-card style="min-width: 1000px; min-height: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления каталога
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="catalog.code" label="Номер каталога" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="selectedSupplierIdName"
          :options="supplierOptions"
          option-value="value"
          option-label="label"
          label="Поставщик"
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
              <q-td key="code" :props="props">
                <q-select
                  filled
                  v-model="props.row.code"
                  :options="equipmentOptions"
                  option-value="value"
                  option-label="label"
                />
              </q-td>
              <q-td key="name" :props="props">
                <q-input readonly v-model="props.row.name" />
              </q-td>
              <q-td key="price" :props="props">
                <q-input v-model.number="props.row.price" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="addCatalog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
