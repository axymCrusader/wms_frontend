import { defineStore } from "pinia";
import type {
  HeaderDeliveryOrder,
  RowDeliveryOrder,
} from "~/utils/types/store/DeliveryOrderTypes";

export const useDeliveryOrderStore = defineStore("DeliveryOrderStore", {
  state: () => ({
    HeaderDeliveryOrders: [] as HeaderDeliveryOrder[],
    RowDeliveryOrders: [] as RowDeliveryOrder[],
    deliveryOrderDialogVisible: false,
  }),
  actions: {
    async fetchDeliveryOrders() {
      // $get<EquipmentCharacteristic>("/equipment-characteristic", { isBearer: true })
      //   .then((response) => {this.EquipmentCharacteristics = response;})
      //   .catch((errors) => {console.error(errors)});
    },
    async addDeliveryOrder(headerDeliveryOrder: HeaderDeliveryOrder) {
      this.HeaderDeliveryOrders.push(headerDeliveryOrder);
    },
  },
});
