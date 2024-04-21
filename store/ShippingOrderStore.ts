import { defineStore } from "pinia";
import type {
  HeaderShippingOrder,
  RowShippingOrder,
} from "@/utils/types/store/ShippingOrderTypes";

export const useShippingOrderStore = defineStore("ShippingOrderStore", {
  state: () => ({
    HeaderShippingOrders: [] as HeaderShippingOrder[],
    RowShippingOrders: [] as RowShippingOrder[],
    shippingOrderDialogVisible: false,
  }),
  actions: {
    async fetchShippingOrders() {
      // $get<EquipmentCharacteristic>("/equipment-characteristic", { isBearer: true })
      //   .then((response) => {this.EquipmentCharacteristics = response;})
      //   .catch((errors) => {console.error(errors)});
    },
  },
});
