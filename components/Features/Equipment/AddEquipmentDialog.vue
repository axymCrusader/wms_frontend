<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import type { IProperty, IEquipment } from "@/utils/types/store/EquipmentTypes";

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();
const equipmentTypeStore = useEquipmentTypeStore();
const equipmentStore = useEquipmentStore();

const { EquipmentTypes } = storeToRefs(equipmentTypeStore);
const { Equipments, Properties, equipmentAddDialogVisible } =
  storeToRefs(equipmentStore);
const { EquipmentCharacteristics, RelationshipsСharacteristicType } =
  storeToRefs(equipmentCharacteristicStore);

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

const addTable = () => {
  if (selectedTypeIdName.value.label === "") {
    alert("Выберите тип оборудования");
    return;
  }
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
        name: "code",
        label: "Номер",
        align: "left",
        field: "code",
      },
      {
        name: "name",
        label: "Наименование",
        align: "left",
        field: "name",
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

const addEquipment = () => {
  tables.value.forEach((table) => {
    table.rows.forEach((row) => {
      const newEquipmentid = Equipments.value.length + 1;
      const newEquipment = {
        id: newEquipmentid,
        code: row.code,
        name: row.name,
        equipmentTypeId: table.subtittle,
      };
      equipmentStore.addEquipment(newEquipment);

      table.columns.forEach((column) => {
        if (column.name !== "code" && column.name !== "name") {
          const newProperty = {
            id: newEquipmentid,
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
};
</script>

<template>
  <q-dialog v-model="equipmentAddDialogVisible" persistent>
    <q-card style="min-width: 800px; min-height: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления оборудования
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
          <hr
            v-if="index < tables.length - 1"
            style="border: 3px solid black"
          />
        </div>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="addEquipment" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
