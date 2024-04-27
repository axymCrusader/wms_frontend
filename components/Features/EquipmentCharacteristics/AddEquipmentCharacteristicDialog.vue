<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();
const equipmentTypeStore = useEquipmentTypeStore();

const { EquipmentTypes } = storeToRefs(equipmentTypeStore);

const equipmentCharacteristic = ref({
  id: 0,
  name: "",
});

const equipmentTypeOptions = EquipmentTypes.value.map((et) => ({
  label: et.name,
  value: et.id,
}));
const multiple = ref([]);

const addCharacteristic = async () => {
  equipmentCharacteristicStore.addEquipmentCharacteristic(
    equipmentCharacteristic.value,
    multiple.value
  );
  equipmentCharacteristic.value = {
    id: 0,
    name: "",
  };
  multiple.value = [];
};
</script>

<template>
  <q-dialog
    v-model="equipmentCharacteristicStore.equipmentCharacteristicsDialogVisible"
    persistent
  >
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления характеристики типа
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="equipmentCharacteristic.name"
          label="Наименование"
        />
      </q-card-section>

      <div class="q-pa-md">
        <q-select
          filled
          v-model="multiple"
          multiple
          :options="equipmentTypeOptions"
          option-value="value"
          option-label="label"
          label="Тип оборудования"
          style="width: 250px"
        />
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn
          flat
          label="сохранить"
          v-close-popup
          @click="addCharacteristic"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
