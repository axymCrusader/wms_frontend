<script setup lang="ts">
import { useWarehouseStore } from "@/store/WareHouseStore";

const dialog = ref(false);
const warehouse = ref({
  warehouseId: "",
  warehouseName: "",
  warehouseType: "",
  warehouseAddress: "",
  warehouseContactPerson: "",
  warehousePhone: "",
});

const warehouseStore = useWarehouseStore();

const onSubmit = async () => {
  dialog.value = false;
};
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления склада
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="warehouse.warehouseId" label="Номер" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="warehouse.warehouseName"
          label="Наименование"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          outlined
          v-model="warehouse.warehouseType"
          :options="['МТС', 'Склад Торговой точки']"
          label="Тип склада"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="warehouse.warehouseAddress" label="Адрес" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="warehouse.warehouseContactPerson"
          label="Контактное лицо"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="warehouse.warehousePhone"
          mask="+#(###) ### - ####"
          label="Телефон"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
