import { defineStore } from "pinia";
import type {
  IRelocationOrder,
  IRelocationOrderLine,
} from "@/utils/types/store/RelocationOrderTypes";

interface IState {
  RelocationOrders: IRelocationOrder[];
  RelocationOrderLines: IRelocationOrderLine[];
  currentOrder: IRelocationOrder;
}

export const useRelocationOrderStore = defineStore("RelocationOrderStore", {
  state: (): IState => ({
    RelocationOrders: [],
    RelocationOrderLines: [],
    currentOrder: null,
  }),
  actions: {
    addRelocationOrder(
      relocationOrder: IRelocationOrder,
      relocationOrderLines: IRelocationOrderLine[]
    ) {
      this.RelocationOrders.push(relocationOrder);

      relocationOrderLines.forEach((rol) => {
        this.RelocationOrderLines.push(rol);
      });
    },
    setOrderData(order: IRelocationOrder) {
      this.currentOrder = order;
    },
  },
});
