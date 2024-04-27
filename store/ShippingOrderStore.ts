import { defineStore } from "pinia";
import type {
  IShippingOrder,
  IShippingOrderLine,
} from "@/utils/types/store/ShippingOrderTypes";

interface IState {
  ShippingOrders: IShippingOrder[];
  ShippingOrderLines: IShippingOrderLine[];
  shippingOrderDialogVisible: boolean;
}

export const useShippingOrderStore = defineStore("ShippingOrderStore", {
  state: (): IState => ({
    ShippingOrders: [],
    ShippingOrderLines: [],
    shippingOrderDialogVisible: false,
  }),
  actions: {},
});
