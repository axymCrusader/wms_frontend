<script setup lang="ts">
import { useWarehouseStore } from "@/store/WareHouseStore";

const warehouse = ref({
  id: 0,
  code: "",
  name: "",
  type: "",
  address: "",
  contactPerson: "",
  phone: "",
});

const warehouseStore = useWarehouseStore();

const addWareHouse = async () => {
  warehouseStore.addWareHouse(warehouse.value);
  warehouse.value = {
    id: 0,
    code: "",
    name: "",
    type: "",
    address: "",
    contactPerson: "",
    phone: "",
  };
};
</script>

<template>
  <q-dialog v-model="warehouseStore.wareHouseDialogVisible" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления склада
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="warehouse.code" label="Номер" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="warehouse.name" label="Наименование" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          outlined
          v-model="warehouse.type"
          :options="['МТС', 'Склад Торговой точки']"
          label="Тип склада"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="warehouse.address" label="Адрес" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="warehouse.contactPerson"
          label="Контактное лицо"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="warehouse.phone"
          mask="+7(###) ### - ####"
          label="Телефон"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="addWareHouse" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
