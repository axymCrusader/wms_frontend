<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";

const dialog = ref(false);
const equipmentCharacteristic = ref({
  equipmentCharacteristicId: "",
  equipmentCharacteristicName: "",
});
const equpmentType = ref({
  equipmentTypeId: "",
  equipmentTypeName: "",
});

const stringOptions: string[] = [
  "Google",
  "Facebook",
  "Twitter",
  "Apple",
  "Oracle",
];
const filterOptions: Ref<string[]> = ref(stringOptions);

const createValue = (
  val: string,
  done: (val: string, mode?: string) => void
) => {
  if (val.length > 0) {
    if (!stringOptions.includes(val)) {
      stringOptions.push(val);
    }
    done(val, "toggle");
  }
};

const filterFn = (val: string, update: (fn: () => void) => void) => {
  update(() => {
    if (val === "") {
      filterOptions.value = stringOptions;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};
const model = ref(null);

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();

const onSubmit = async () => {
  dialog.value = false;
};
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления характеристики типа
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="equipmentCharacteristic.equipmentCharacteristicId"
          label="Номер"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="equipmentCharacteristic.equipmentCharacteristicName"
          label="Наименование"
        />
      </q-card-section>

      <div class="q-pa-md">
        <q-select
          filled
          v-model="model"
          use-input
          use-chips
          multiple
          input-debounce="0"
          @new-value="createValue"
          :options="filterOptions"
          @filter="filterFn"
          label="Типы оборудования"
          style="width: 250px"
        />
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
