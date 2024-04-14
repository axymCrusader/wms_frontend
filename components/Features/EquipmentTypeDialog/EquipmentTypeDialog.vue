<script setup lang="ts">
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";

const dialog = ref(false);
const equipmentType = ref({
  equipmentTypeId: "",
  equipmentTypeName: "",
});

const equipmentTypeStore = useEquipmentTypeStore();

const onSubmit = async () => {
  dialog.value = false;
};
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления типа оборудования
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="equipmentType.equipmentTypeId"
          label="Номер"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="equipmentType.equipmentTypeName"
          label="Наименование"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
