import { defineStore } from "pinia";
import type {
  IDeliveryOrder,
  IDeliveryOrderLine,
} from "~/utils/types/store/DeliveryOrderTypes";

interface IState {
  DeliveryOrders: IDeliveryOrder[];
  DeliveryOrderLines: IDeliveryOrderLine[];
  deliveryOrderAddDialogBasedOnRequirementVisible: boolean;
  deliveryOrderAddDialogBasedOnForecastVisible: boolean;
  deliveryOrderShowDialogVisible: boolean;
}

export const useDeliveryOrderStore = defineStore("DeliveryOrderStore", {
  state: (): IState => ({
    DeliveryOrders: [],
    DeliveryOrderLines: [],
    deliveryOrderAddDialogBasedOnRequirementVisible: false,
    deliveryOrderAddDialogBasedOnForecastVisible: false,
    deliveryOrderShowDialogVisible: false,
  }),
  actions: {
    addDeliveryOrder(deliveryOrder: IDeliveryOrder) {
      this.DeliveryOrders.push(deliveryOrder);
    },
  },
});
