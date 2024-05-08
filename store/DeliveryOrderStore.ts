import { defineStore } from "pinia";
import type {
  IDeliveryOrder,
  IDeliveryOrderLine,
} from "@/utils/types/store/DeliveryOrderTypes";
import { DOCUMENT_STATUSES } from "@/utils/DocumentStatus";

interface IState {
  DeliveryOrders: IDeliveryOrder[];
  DeliveryOrderLines: IDeliveryOrderLine[];
  currentOrder: IDeliveryOrder | null;
  deliveryOrderAddDialogBasedOnRequirementVisible: boolean;
  deliveryOrderAddDialogBasedOnForecastVisible: boolean;
  deliveryOrderShowDialogVisible: boolean;
}

export const useDeliveryOrderStore = defineStore("DeliveryOrderStore", {
  state: (): IState => ({
    DeliveryOrders: [],
    DeliveryOrderLines: [],
    currentOrder: null,
    deliveryOrderAddDialogBasedOnRequirementVisible: false,
    deliveryOrderAddDialogBasedOnForecastVisible: false,
    deliveryOrderShowDialogVisible: false,
  }),
  actions: {
    addDeliveryOrder(
      deliveryOrder: IDeliveryOrder,
      deliveryOrderLines: IDeliveryOrderLine[]
    ) {
      this.DeliveryOrders.push(deliveryOrder);

      deliveryOrderLines.forEach((dol) => {
        this.DeliveryOrderLines.push(dol);
      });
      this.deliveryOrderAddDialogBasedOnForecastVisible = false;
    },
    setOrderData(order: IDeliveryOrder) {
      this.currentOrder = order;
    },
  },
});
