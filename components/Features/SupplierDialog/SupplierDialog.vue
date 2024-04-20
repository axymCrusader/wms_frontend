<script setup lang="ts">
import { useSupplierStore } from "@/store/SupplierStore";

const supplier = ref({
  supplierId: "",
  supplierName: "",
  supplierInn: "",
  supplierBic: "",
  supplierContactPerson: "",
  supplierPhone: "",
});

const supplierStore = useSupplierStore();

const addSupplier = async () => {
  supplierStore.addSupplier(supplier.value);
  supplier.value = {
    supplierId: "",
    supplierName: "",
    supplierInn: "",
    supplierBic: "",
    supplierContactPerson: "",
    supplierPhone: "",
  }
};
</script>

<template>
  <q-dialog v-model="supplierStore.supplierDialogVisible" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления поставщика
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="supplier.supplierId" label="Номер" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="supplier.supplierName"
          label="Наименование"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="supplier.supplierInn"
          label="ИНН"
          mask="############"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="supplier.supplierBic"
          label="БИК"
          mask="#########"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="supplier.supplierContactPerson"
          label="Контактное лицо"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="supplier.supplierPhone"
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
