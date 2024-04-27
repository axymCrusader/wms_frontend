<script setup lang="ts">
import { useSupplierStore } from "@/store/SupplierStore";

const supplier = ref({
  id: 0,
  name: "",
  inn: "",
  bic: "",
  contactPerson: "",
  phone: "",
});

const supplierStore = useSupplierStore();

const addSupplier = async () => {
  supplierStore.addSupplier(supplier.value);
  supplier.value = {
    id: 0,
    name: "",
    inn: "",
    bic: "",
    contactPerson: "",
    phone: "",
  };
};
</script>

<template>
  <q-dialog v-model="supplierStore.supplierDialogVisible" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления поставщика
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="supplier.name" label="Наименование" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="supplier.inn"
          label="ИНН"
          mask="############"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="supplier.bic" label="БИК" mask="#########" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="supplier.contactPerson"
          label="Контактное лицо"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="supplier.phone"
          mask="+7(###) ### - ####"
          label="Телефон"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="addSupplier" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
