import { defineStore } from "pinia";
import type {
  IShippingOrder,
  IShippingOrderLine,
} from "@/utils/types/store/ShippingOrderTypes";

interface IState {
  ShippingOrders: IShippingOrder[];
  ShippingOrderLines: IShippingOrderLine[];
  currentOrder: IShippingOrder | null;
  shippingOrderAddDialogVisible: boolean;
}

export const useShippingOrderStore = defineStore("ShippingOrderStore", {
  state: (): IState => ({
    ShippingOrders: [],
    ShippingOrderLines: [],
    currentOrder: null,
    shippingOrderAddDialogVisible: false,
  }),
  actions: {
    addShippingОrder(
      shippingОrder: IShippingOrder,
      shippingОrderLines: IShippingOrderLine[]
    ) {
      this.ShippingOrders.push(shippingОrder);

      shippingОrderLines.forEach((sol) => {
        this.ShippingOrderLines.push(sol);
      });
      this.shippingOrderAddDialogVisible = false;
    },
    setOrderData(order: IShippingOrder) {
      this.currentOrder = order;
    },
  },
});
