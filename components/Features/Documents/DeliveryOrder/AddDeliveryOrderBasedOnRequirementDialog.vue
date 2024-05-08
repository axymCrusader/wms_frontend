<script setup lang="ts">
import { useDeliveryOrderStore } from "@/store/DeliveryOrderStore";
import { useWarehouseStore } from "@/store/WareHouseStore";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";
import { useEquipmentRequirementStore } from "@/store/EquipmentRequirementStore";
import { useBalanceStore } from "@/store/BalanceStore";
import { useEquipmentStore } from "@/store/EquipmentStore";
import { useRelocationOrderStore } from "@/store/RelocationOrderStore";

const deliveryOrderStore = useDeliveryOrderStore();
const relocationOrderStore = useRelocationOrderStore();
const { EquipmentRequirements, currentEquipmentRequirement } = storeToRefs(
  useEquipmentRequirementStore()
);
const { DeliveryOrders } = storeToRefs(deliveryOrderStore);
const { WareHouses } = storeToRefs(useWarehouseStore());
const { Balances } = storeToRefs(useBalanceStore());
const { Equipments } = storeToRefs(useEquipmentStore());

const deliveryOrder = ref({
  id: 0,
  code: "",
  status: "",
  date: "",
  wareHouseId: 0,
  equipmentRequirementCode: "",
});

const columns = [
  {
    name: "equipmentCode",
    required: true,
    label: "Номер оборудования",
    align: "left",
    field: "equipmentCode",
  },
  {
    name: "equipmentQuantity",
    required: true,
    label: "Количество",
    align: "left",
    field: "equipmentQuantity",
  },
];

const wareHouseCode = computed(
  () => currentEquipmentRequirement.value?.wareHouseCode
);

const equipmentRequirementCode = computed(
  () => currentEquipmentRequirement.value?.code
);

const equipmentData = ref<
  { equipmentCode: string; equipmentQuantity: number }[]
>([]);

watch(
  () => currentEquipmentRequirement.value?.code,
  (newCode) => {
    if (newCode) {
      equipmentData.value = EquipmentRequirements.value
        .filter((item) => item.code === newCode)
        .map((item) => ({
          equipmentCode: item.equipmentCode,
          equipmentQuantity: item.equipmentQuantity,
        }));
    } else {
      equipmentData.value = [];
    }
  }
);

const addDeliveryOrderOrRelocationOrder = () => {
  const allQuantitiesZero = equipmentData.value.every(
    (item) => item.equipmentQuantity === 0
  );

  if (allQuantitiesZero) {
    deliveryOrder.value.status = DOCUMENT_STATUSES.CREATED;
    deliveryOrder.value.date = new Date().toLocaleDateString("en-GB");
    const wareHouseId =
      WareHouses.value.find((wh) => wh.code === wareHouseCode.value)?.id ?? 0;
    deliveryOrder.value.wareHouseId = wareHouseId;
    deliveryOrder.value.id = 1;
    deliveryOrder.value.equipmentRequirementCode =
      equipmentRequirementCode.value as string;

    const lines = [
      {
        id: 1,
        equipmentId: 1,
        equipmentCode: "О1",
        equipmentQuantity: 2,
      },
      {
        id: 1,
        equipmentId: 4,
        equipmentCode: "О4",
        equipmentQuantity: 2,
      },
    ];
    relocationOrderStore.addRelocationOrder(deliveryOrder.value, lines);
  } else {
    deliveryOrder.value.status = DOCUMENT_STATUSES.CREATED;
    deliveryOrder.value.date = new Date().toLocaleDateString("en-GB");
    const wareHouseId =
      WareHouses.value.find((wh) => wh.code === wareHouseCode.value)?.id ?? 0;
    deliveryOrder.value.wareHouseId = wareHouseId;
    deliveryOrder.value.id = DeliveryOrders.value.length + 1;
    deliveryOrder.value.equipmentRequirementCode =
      equipmentRequirementCode.value as string;

    const equipmentDataArray = equipmentData.value;
    const equipmentCodes: string[] = equipmentDataArray.map(
      (row) => row.equipmentCode
    );
    const equipmentIds: number[] = Equipments.value
      .filter((equipment) => equipmentCodes.includes(equipment.code))
      .map((equipment) => equipment.id);

    const lines = equipmentDataArray.map((item, index) => ({
      id: deliveryOrder.value.id,
      equipmentId: equipmentIds[index],
      equipmentCode: item.equipmentCode,
      equipmentQuantity: item.equipmentQuantity,
    }));

    deliveryOrderStore.addDeliveryOrder(deliveryOrder.value, lines);
  }
};

const balanceAnalysis = () => {
  const filteredBalances = Balances.value.filter((balance) => {
    const warehouse = WareHouses.value.find(
      (wh) => wh.id === balance.wareHouseId
    );
    return warehouse?.type === "МТС";
  });
  console.log(filteredBalances);
  equipmentData.value = equipmentData.value.map((item) => {
    const balanceItem = filteredBalances.find(
      (balance) => balance.equipmentCode === item.equipmentCode
    );
    if (balanceItem) {
      const itemQuantity = toRef(item, "equipmentQuantity");
      itemQuantity.value -= balanceItem.equipmentQuantity;
    }
    return item;
  });

  console.log("equipmentData after balance analysis:", equipmentData.value);
};
</script>

<template>
  <q-dialog
    v-model="deliveryOrderStore.deliveryOrderAddDialogBasedOnRequirementVisible"
    persistent
  >
    <q-card style="min-width: 900px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Форма для создания заказа
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="deliveryOrder.code" label="Номер заказа" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled v-model="wareHouseCode" label="Номер склада" readonly />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          filled
          v-model="equipmentRequirementCode"
          label="Номер потребности"
          readonly
        />
      </q-card-section>

      <div class="q-pa-md">
        <q-toolbar>
          <q-toolbar-title>
            {{ "Строки заказа на поставку" }}
          </q-toolbar-title>
          <q-space />
        </q-toolbar>
        <q-table flat bordered :rows="equipmentData" :columns="columns">
          <template v-slot:top>
            <q-btn
              class="q-ml-sm"
              color="green"
              label="Анализ остатков"
              @click="balanceAnalysis"
            />
            <q-space />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="equipmentCode" :props="props">
                <q-input filled v-model="props.row.equipmentCode" readonly />
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
        <q-btn
          flat
          label="сохранить"
          v-close-popup
          @click="addDeliveryOrderOrRelocationOrder"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
