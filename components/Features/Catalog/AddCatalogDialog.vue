<script setup lang="ts">
import { useCatalogStore } from "@/store/CatalogStore";
import { useSupplierStore } from "@/store/SupplierStore";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";

const catalogStore = useCatalogStore();
const equipmentStore = useEquipmentStore();
const { Catalogs, catalogAddDialogVisible } = storeToRefs(catalogStore);
const { EquipmentTypes } = storeToRefs(useEquipmentTypeStore());
const { EquipmentCharacteristics, RelationshipsСharacteristicType } =
  storeToRefs(useEquipmentCharacteristicStore());
const { Equipments, Properties } = storeToRefs(equipmentStore);
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

const typeOptions = EquipmentTypes.value.map((et) => ({
  label: et.name,
  value: et.id,
}));

const selectedTypeIdName = ref({
  label: "",
  value: 0,
});

const tables = ref<
  {
    title: string;
    subtittle: number;
    columns: {
      name: string;
      label: string;
      align: string;
      field: number;
    }[];
    rows: any[];
  }[]
>([]);

const addCatalog = () => {
  tables.value.forEach((table) => {
    table.rows.forEach((row) => {
      const newEquipmentId = Equipments.value.length + 1;
      const newCatalogId = Catalogs.value.length + 1;

      const newCatalog = {
        id: newCatalogId,
        code: catalog.value.code,
        supplierId: selectedSupplierIdName.value.value,
        equipmentId: newEquipmentId,
        price: row.catalogPrice,
      };

      catalogStore.addCatalog(newCatalog);

      const newEquipment = {
        id: newEquipmentId,
        code: row.equipmentCode,
        name: row.equipmentName,
        equipmentTypeId: table.subtittle,
      };

      equipmentStore.addEquipment(newEquipment);

      table.columns.forEach((column) => {
        if (column.name !== "code" && column.name !== "name") {
          const newProperty = {
            id: newEquipmentId,
            equipmentCharacteristicId: column.field,
            value: row[column.name],
          };
          equipmentStore.addProperty(newProperty);
        }
      });
    });
  });
  tables.value = [];
  selectedTypeIdName.value = { label: "", value: 0 };

  tables.value = [];
  catalog.value = { code: "" };
  selectedSupplierIdName.value = { label: "", value: 0 };
  selectedTypeIdName.value = { label: "", value: 0 };
};

const addTable = () => {
  const existingTable = tables.value.find(
    (table) => table.title === selectedTypeIdName.value.label
  );

  if (existingTable) {
    alert("Таблица этого типа уже добавлена");
    return;
  }
  const characteristicsColumns = RelationshipsСharacteristicType.value
    .filter((rel) => rel.equipmentTypeId === selectedTypeIdName.value.value)
    .map((rel) => {
      return EquipmentCharacteristics.value.find((ec) => ec.id === rel.id);
    });

  tables.value.push({
    title: selectedTypeIdName.value.label,
    subtittle: selectedTypeIdName.value.value,
    columns: [
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
        name: "catalogPrice",
        label: "Цена оборудования",
        align: "left",
        field: "catalogPrice",
      },
      ...characteristicsColumns.map((cc: any) => ({
        name: cc.name,
        label: cc.name,
        align: "left",
        field: cc.id,
      })),
    ],
    rows: [],
  });
};

const addRow = (tableIndex: number) => {
  tables.value[tableIndex].rows.push({});
};

const removeRow = (tableIndex: number) => {
  if (tables.value[tableIndex].rows.length > 0) {
    tables.value[tableIndex].rows.pop();
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
          </q-toolbar>
          <q-table
            flat
            bordered
            :rows="table.rows"
            :columns="table.columns"
            row-key="id"
          >
            <template v-slot:top>
              <q-btn
                color="green"
                label="Добавить строку"
                @click="addRow(index)"
              />
              <q-btn
                v-if="table.rows.length !== 0"
                class="q-ml-sm"
                color="red"
                label="Удалить строку"
                @click="removeRow(index)"
              />
              <q-space />
            </template>
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
        </div>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="addCatalog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
