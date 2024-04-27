<script setup lang="ts">
import { useEquipmentCharacteristicStore } from "@/store/EquipmentCharacteristicStore";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useEquipmentTypeStore } from "@/store/EquipmentTypeStore";
import type { IProperty, IEquipment } from "@/utils/types/store/EquipmentTypes";

const equipmentCharacteristicStore = useEquipmentCharacteristicStore();
const equipmentTypeStore = useEquipmentTypeStore();
const equipmentStore = useEquipmentStore();

const { EquipmentTypes } = storeToRefs(equipmentTypeStore);
const { Equipments, Properties } = storeToRefs(equipmentStore);
const { EquipmentCharacteristics, RelationshipsСharacteristicType } =
  storeToRefs(equipmentCharacteristicStore);
</script>

<template>
  <q-dialog v-model="equipmentStore.equipmentShowDialogVisible" persistent>
    <q-card style="min-width: 800px; min-height: 500px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Информация об оборудовании
      </q-card-section>

      <q-card-section class="q-pt-none"> </q-card-section>

      <div class="q-pa-md"></div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
