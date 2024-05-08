<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { useWarehouseStore } from "@/store/WareHouseStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useCatalogStore } from "@/store/CatalogStore";

const deliveryOrderStore = useDeliveryOrderStore();
const { deliveryOrderAddDialogBasedOnForecastVisible, DeliveryOrders } =
  storeToRefs(deliveryOrderStore);
const { WareHouses } = storeToRefs(useWarehouseStore());
const { Equipments, Handbooks } = storeToRefs(useEquipmentStore());
const { Catalogs } = storeToRefs(useCatalogStore());

const deliveryOrder = ref({
  id: 0,
  code: "",
  status: "",
  date: "",
  wareHouseId: 0,
  equipmentRequirementCode: null,
});

const selectedWareHouseIdName = ref({
  label: "",
  value: 0,
});

const wareHouseOptions = WareHouses.value.map((wh) => ({
  label: wh.code,
  value: wh.id,
}));

const table = ref<{
  title: string;
  columns: { name: string; label: string; align: string; field: string }[];
  rows: {
    equipmentCode: string;
    equipmentName: string;
    equipmentPrice: number;
    equipmentQuantity: number;
  }[];
}>({
  title: "Строки заказа",
  columns: [
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
    {
      name: "equipmentQuantity",
      label: "Кол-во",
      align: "left",
      field: "equipmentQuantity",
    },
  ],
  rows: [],
});

const addRow = () => {
  table.value.rows.push({
    equipmentCode: "",
    equipmentName: "",
    equipmentPrice: 0,
    equipmentQuantity: 0,
  });
};
const removeRow = () => {
  if (table.value.rows.length > 0) {
    table.value.rows.pop();
  }
};

const equipmentCodeOptions = computed(() => {
  const handbookEquipmentIds = Handbooks.value.map((hb) => hb.id);

  const filteredEquipments = Equipments.value.filter((eq) =>
    handbookEquipmentIds.includes(eq.id)
  );
  const filteredCatalogs = Catalogs.value.filter((cat) =>
    handbookEquipmentIds.includes(cat.equipmentId)
  );

  return table.value.rows.map((row) => {
    return filteredEquipments.map((eq) => {
      const catalog = filteredCatalogs.find((cat) => cat.equipmentId === eq.id);
      return {
        label: eq.code,
        value: {
          name: eq.name,
          price: catalog ? catalog.price : 0,
        },
      };
    });
  });
});

const addDeliveryOrder = () => {
  deliveryOrder.value.status = DOCUMENT_STATUSES.CREATED;
  deliveryOrder.value.date = new Date().toLocaleDateString("en-GB");
  deliveryOrder.value.wareHouseId = selectedWareHouseIdName.value.value;
  deliveryOrder.value.id = DeliveryOrders.value.length + 1;
  deliveryOrder.value.equipmentRequirementCode = null;

  const equipmentRows: { equipmentCode: string }[] = table.value.rows.map(
    (row) => ({
      equipmentCode: row.equipmentCode.label,
    })
  );
  const equipmentCodes: string[] = equipmentRows.map(
    (row) => row.equipmentCode
  );
  const equipmentIds: number[] = Equipments.value
    .filter((equipment) => equipmentCodes.includes(equipment.code))
    .map((equipment) => equipment.id);

  const lines = table.value.rows.map((row, index) => ({
    id: deliveryOrder.value.id,
    equipmentId: equipmentIds[index],
    equipmentCode: equipmentCodes[index],
    equipmentQuantity: row.equipmentQuantity,
  }));

  deliveryOrderStore.addDeliveryOrder(deliveryOrder.value, lines);

  deliveryOrder.value = {
    id: 0,
    code: "",
    status: "",
    date: "",
    wareHouseId: 0,
    equipmentRequirementCode: null,
  };
  selectedWareHouseIdName.value = {
    label: "",
    value: 0,
  };
  table.value.rows = [];
};
</script>

<template>
  <q-dialog v-model="deliveryOrderAddDialogBasedOnForecastVisible" persistent>
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для добавления заказа на основании прогноза
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model.number="deliveryOrder.code"
          label="Номер зказа"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="selectedWareHouseIdName"
          :options="wareHouseOptions"
          option-value="value"
          option-label="label"
          label="Склад"
        />
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
              <q-td key="equipmentQuantity" :props="props">
                <q-input v-model.number="props.row.equipmentQuantity" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="закрыть" v-close-popup />
        <q-btn flat label="сохранить" v-close-popup @click="addDeliveryOrder" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
