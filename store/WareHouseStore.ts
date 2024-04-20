import { defineStore } from "pinia";
import type { WareHouse } from "@/utils/types/store/WareHouseTypes";

export const useWarehouseStore = defineStore('WareHouseStore',{
  state: () => ({
    WareHouses: [] as WareHouse[],
      wareHouseDialogVisible: false,
  }),
  actions: {
    async fetchWarehouses() {
      // $get<WareHouse>("/warehouse", { isBearer: true })
      //   .then((response) => {this.WareHouses = response;})
      //   .catch((errors) => {console.error(errors)});
    },
    async addWareHouse(warehouse: WareHouse) {
      this.WareHouses.push(warehouse);
      this.wareHouseDialogVisible = false;
      // $post<WareHouse>("/warehouse", { isBearer: true });
    },
    async deleteWareHouse(wareHouseId: string) {
      this.WareHouses = this.WareHouses.filter(wh => wh.wareHouseId !== wareHouseId);
      // $delete<WareHouse>("/warehouse/" + wareHouseId, { isBearer: true });
    },
  },
});
