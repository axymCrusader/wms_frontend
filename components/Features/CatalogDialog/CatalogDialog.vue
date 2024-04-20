<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import { useCatalogStore } from "@/store/CatalogStore";
import { useSupplierStore } from "@/store/SupplierStore";
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import type {
  Catalog,
  Property,
  Equipment,
} from "@/utils/types/store/CatalogTypes";

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();
const catalogStore = useCatalogStore();
const supplierStore = useSupplierStore();
const equipmentTypeStore = useEquipmentTypeStore();

const supplierOptions = supplierStore.Suppliers.map(
  (sup: { supplierId: string; supplierName: string }) => ({
    label: sup.supplierName,
    value: sup.supplierId,
  })
);

const typeOptions = equipmentTypeStore.EquipmentTypes.map(
  (et: { equipmentTypeId: string; equipmentTypeName: string }) => ({
    label: et.equipmentTypeName,
    value: et.equipmentTypeId,
  })
);

const selectedTypeIdName = ref({
  label: "",
  value: "",
});

const selectedSupplierIdName = ref({
  label: "",
  value: "",
});

const catalog = ref({
  catalogId: "",
});

const tables = ref<
  {
    title: string;
    columns: { name: string; label: string; align: string; field: string }[];
    rows: any[];
  }[]
>([]);

const onSubmit = () => {
  const catalogs: Catalog[] = tables.value.flatMap((table: any) => {
    return table.rows.map((row: any) => {
      return {
        catalogId: catalog.value.catalogId,
        catalogSupplierId: selectedSupplierIdName.value.value,
        catalogEquipmentId: row.equipmentId,
        catalogPrice: row.catalogPrice,
      };
    });
  });

  const equipments: Equipment[] = tables.value.flatMap((table: any) => {
    return table.rows.map((row: any) => {
      return {
        equipmentId: row.equipmentId,
        equipmentName: row.equipmentName,
        equipmentTypeId: selectedTypeIdName.value.value,
      };
    });
  });

  const properties: Property[] = tables.value.flatMap((table: any) => {
    return table.rows.flatMap((row: any) => {
      return table.columns.slice(3).map((column: any) => {
        return {
          equipmentId: row.equipmentId,
          equipmentCharacteristicId: column.field,
          propertyValue: row[column.name],
        };
      });
    });
  });

  catalogStore.addCatalog(catalogs, equipments, properties);
  tables.value = [];
  catalog.value = { catalogId: "" };
  selectedSupplierIdName.value = { label: "", value: "" };
  selectedTypeIdName.value = { label: "", value: "" };
};

const addRow = (tableIndex: number) => {
  tables.value[tableIndex].rows.push({});
};

const addTable = () => {
  const existingTable = tables.value.find(
    (table: {
      title: string;
      columns: { name: string; label: string; align: string; field: string }[];
      rows: any[];
    }) => table.title === selectedTypeIdName.value.label
  );

  if (existingTable) {
    alert("Таблица этого типа уже добавлена");
    return;
  }
  const characteristicsColumns =
    equipmentCharacteristicStore.CharacteristicsTableData.filter(
      (row: {
        equipmentCharacteristicId: string;
        equipmentCharacteristicName: string;
        equipmentTypeId: string;
        equipmentTypeName: string;
      }) => row.equipmentTypeId === selectedTypeIdName.value.value
    );

  tables.value.push({
    title: selectedTypeIdName.value.label,
    columns: [
      {
        name: "equipmentId",
        label: "Номер оборудования",
        align: "left",
        field: "equipmentId",
      },
      {
        name: "equipmentName",
        label: "Наименование оборудования",
        align: "left",
        field: "equipmentName",
      },
      {
        name: "catalogPrice",
        label: "Цена оборудования",
        align: "left",
        field: "catalogPrice",
      },
      ...characteristicsColumns.map(
        (char: {
          equipmentCharacteristicId: string;
          equipmentCharacteristicName: string;
          equipmentTypeId: string;
          equipmentTypeName: string;
        }) => ({
          name: char.equipmentCharacteristicName,
          label: char.equipmentCharacteristicName,
          align: "left",
          field: char.equipmentCharacteristicId,
        })
      ),
    ],
    rows: [],
  });
};
</script>

<template>
  <q-dialog v-model="catalogStore.catalogDialogVisible" persistent>
    <q-card style="min-width: 1800px; min-height: 700px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления каталога
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="catalog.catalogId" label="Номер каталога" />
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

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="selectedTypeIdName"
          :options="typeOptions"
          option-value="value"
          option-label="label"
          label="Тип оборудования"
        />
        <q-btn flat label="Добавить" @click="addTable" />
      </q-card-section>

      <div class="q-pa-md">
        <div v-for="(table, index) in tables" :key="index">
          <q-toolbar>
            <q-toolbar-title>
              {{ table.title }}
            </q-toolbar-title>
            <q-space />
            <q-btn flat label="Добавить строку" @click="() => addRow(index)" />
          </q-toolbar>
          <q-table
            flat
            bordered
            :rows="table.rows"
            :columns="table.columns"
            row-key="id"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <q-input
                  v-model.number="props.row[props.col.name]"
                  input-class="text-left"
                  dense
                  borderless
                />
              </q-td>
            </template>
          </q-table>
          <hr
            v-if="index < tables.length - 1"
            style="border: 3px solid black"
          />
        </div>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
