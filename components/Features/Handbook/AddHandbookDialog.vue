<script setup lang="ts">
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useCatalogStore } from "@/store/CatalogStore";
import type { IHandbook } from "@/utils/types/store/EquipmentTypes";

const equipmentStore = useEquipmentStore();
const { Equipments, handbookAddDialogVisible } = storeToRefs(equipmentStore);
const { Catalogs } = storeToRefs(useCatalogStore());

const table = ref<{
  title: string;
  columns: { name: string; label: string; align: string; field: string }[];
  rows: {
    catalogCode: string;
    equipmentCode: string;
    equipmentName: string;
    equipmentPrice: number;
  }[];
}>({
  title: "Справочник",
  columns: [
    {
      name: "catalogCode",
      label: "Номер каталога",
      align: "left",
      field: "catalogCode",
    },
    {
      name: "equipmentCode",
      label: "Номер оборудования",
      align: "left",
      field: "equipmentCode",
    },
    {
      name: "equipmentName",
      label: "Наименование оборудования",
      align: "left",
      field: "equipmentName",
    },
    {
      name: "equipmentPrice",
      label: "Цена ед. оборудования",
      align: "left",
      field: "equipmentPrice",
    },
  ],
  rows: [],
});

const catalogCodes = new Set(Catalogs.value.map((ct) => ct.code));
const catalogOptions = Array.from(catalogCodes, (code) => ({ label: code }));

const addRow = () => {
  table.value.rows.push({
    catalogCode: "",
    equipmentCode: "",
    equipmentName: "",
    equipmentPrice: 0,
  });
};

const removeRow = () => {
  if (table.value.rows.length > 0) {
    table.value.rows.pop();
  }
};

const getEquipmentCodeOptions = (catalogCode: any) => {
  const code =
    typeof catalogCode === "object" && catalogCode !== null
      ? catalogCode.label
      : catalogCode;
  const catalogs = Catalogs.value.filter((ct) => ct.code === code);
  if (catalogs.length === 0) {
    return [];
  }
  let equipmentCodes: {
    label: string;
    value: { name: string; price: number };
  }[] = [];
  for (let catalog of catalogs) {
    const equipments = Equipments.value.filter(
      (eq) => eq.id === catalog.equipmentId
    );
    for (let equipment of equipments) {
      equipmentCodes.push({
        label: equipment.code,
        value: { name: equipment.name, price: catalog.price },
      });
    }
  }
  return equipmentCodes;
};

const addHandBook = () => {
  const catalogEquipmentRows: { catalogCode: string; equipmentCode: string }[] =
    table.value.rows.map((row) => ({
      catalogCode: row.catalogCode.label,
      equipmentCode: row.equipmentCode.label,
    }));

  const equipmentCodes: string[] = catalogEquipmentRows.map(
    (row) => row.equipmentCode
  );
  const equipmentIds: number[] = Equipments.value
    .filter((equipment) => equipmentCodes.includes(equipment.code))
    .map((equipment) => equipment.id);

  const catalogIds: number[] = Catalogs.value
    .filter((catalog) =>
      catalogEquipmentRows.some((row) => row.catalogCode === catalog.code)
    )
    .filter((catalog) => equipmentIds.includes(catalog.equipmentId))
    .map((catalog) => catalog.id);
  const handbooks: IHandbook[] = equipmentIds.map((id, index) => ({
    id,
    catalogId: catalogIds[index],
  }));
  equipmentStore.addHandBook(handbooks);
  table.value.rows = [];
};

const equipmentCodeOptions = computed(() => {
  return table.value.rows.map((row) =>
    getEquipmentCodeOptions(row.catalogCode)
  );
});
</script>

<template>
  <q-dialog v-model="handbookAddDialogVisible" persistent>
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления справочника
      </q-card-section>

      <div class="q-pa-md">
        <q-toolbar>
          <q-toolbar-title>
            {{ table.title }}
          </q-toolbar-title>
          <q-space />
        </q-toolbar>
        <q-table flat bordered :rows="table.rows" :columns="table.columns">
          <template v-slot:top>
            <q-btn color="green" label="Добавить строку" @click="addRow" />
            <q-btn
              v-if="table.rows.length !== 0"
              class="q-ml-sm"
              color="red"
              label="Удалить строку"
              @click="removeRow"
            />
            <q-space />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="catalogCode" :props="props">
                <q-select
                  filled
                  v-model="props.row.catalogCode"
                  :options="catalogOptions"
                />
              </q-td>
              <q-td key="equipmentCode" :props="props">
                <q-select
                  filled
                  v-model="props.row.equipmentCode"
                  :options="equipmentCodeOptions[props.rowIndex]"
                  option-label="label"
                  @update:model-value="
                    (val) => {
                      props.row.equipmentName = val.value.name;
                      props.row.equipmentPrice = val.value.price;
                    }
                  "
                />
              </q-td>
              <q-td key="equipmentName" :props="props">
                <q-input v-model="props.row.equipmentName" readonly />
              </q-td>
              <q-td key="equipmentPrice" :props="props">
                <q-input v-model.number="props.row.equipmentPrice" readonly />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="addHandBook" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
