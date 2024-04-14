import { defineStore } from "pinia";
import type { WareHouse } from "@/utils/types/store/WareHouseTypes";

export const useWarehouseStore = defineStore({
  id: "WareHouse",
  state: () => ({
    WareHouses: [] as WareHouse[],
  }),
  actions: {
    async fetchWarehouses() {
      $get<WareHouse>("/warehouse", { isBearer: true })
        .then((res) => {})
        .catch((error) => {});
    },
    async addWarehouse(warehouse: WareHouse) {
      $post<WareHouse>("/warehouse", { isBearer: true });
    },
  },
});
