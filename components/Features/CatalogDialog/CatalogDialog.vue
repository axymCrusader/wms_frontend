<script setup lang="ts">
const dialog = ref(false);
const catalog = ref({
  catalogId: "",
  catalogSupplierName: "",
});
const selectedElement = ref("");
const elementOptions = ref(["Тип1", "Тип2", "Тип3"]);
const tables = ref([]);

const onSubmit = () => {};

const addTable = () => {
  if (
    selectedElement.value &&
    !tables.value.find((t) => t.title === selectedElement.value)
  ) {
    tables.value.push({
      title: selectedElement.value,
      columns: [
        {
          name: "column1",
          required: true,
          label: "Номер",
          align: "left",
          field: "column1",
        },
        {
          name: "column2",
          required: true,
          label: "Наименование",
          align: "left",
          field: "column2",
        },
        {
          name: "column3",
          required: true,
          label: "Характеристика 1",
          align: "left",
          field: "column3",
        },
        {
          name: "column4",
          required: true,
          label: "Характеристика 2",
          align: "left",
          field: "column4",
        },
      ],
      rows: [{ column1: "--", column2: "--", column3: "--", column4: "--" }],
    });
  }
};
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 1500px; min-height: 700px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления каталога
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="catalog.catalogId" label="Номер каталога" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          outlined
          v-model="catalog.catalogSupplierName"
          :options="['ООО da', 'АО вф']"
          label="Поставщик"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          outlined
          v-model="selectedElement"
          :options="elementOptions"
          label="Выберите тип оборудования"
        />
        <q-btn flat label="Добавить" @click="addTable" />
      </q-card-section>

      <div class="q-pa-md">
        <div v-for="(table, index) in tables" :key="index">
          <q-table
            flat
            bordered
            :title="table.title"
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
        </div>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
