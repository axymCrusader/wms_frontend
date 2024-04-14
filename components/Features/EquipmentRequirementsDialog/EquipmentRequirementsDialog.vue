<script setup lang="ts">
const dialog = ref(false);

const onSubmit = async () => {
  dialog.value = false;
};
const table = reactive({
  title: "Оборудование к заказу",
  rows: [
    { id: 1, column1: "", column2: "" },
    { id: 2, column1: "", column2: "" },
  ],
  columns: [
    {
      name: "column1",
      label: "Наименование оборудования",
      field: "column1",
      align: "left",
      sortable: true,
    },
    {
      name: "column2",
      label: "Кол-во",
      field: "column2",
      align: "left",
      sortable: true,
    },
    // Add more columns as needed
  ],
});

const rows = ref(table.rows);

const selectedTypeOrder = ref(null);
const selectedEquipmentRequirementId = ref(null);
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для создания заказа
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          outlined
          v-model="selectedTypeOrder"
          :options="['Заказ на основании п.о.', 'Заказ не на основании п.о']"
          label="Выберите тип заказа"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="selectedTypeOrder === 'Заказ на основании п.о.'">
          <q-select
            outlined
            v-model="selectedEquipmentRequirementId"
            :options="['П1111111111', 'ПО123131313']"
            label="Выберите номер потребности"
          />
          <q-btn label="Анализ остатков" />
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
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="selectedTypeOrder === 'Заказ не на основании п.о'">
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
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
