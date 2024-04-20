<script setup lang="ts">
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";

const equipmentType = ref({
  equipmentTypeId: "",
  equipmentTypeName: "",
});

const equipmentTypeStore = useEquipmentTypeStore();

const addEquipmentType = async () => {
  equipmentTypeStore.addEquipmentType(equipmentType.value);
  equipmentType.value = {
    equipmentTypeId: "",
    equipmentTypeName: "",
  }
};
</script>

<template>
  <q-dialog v-model="equipmentTypeStore.equipmentTypeDialogVisible" persistent>
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
        <q-btn flat label="сохранить" v-close-popup @click="addEquipmentType" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
