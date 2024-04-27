import { defineStore } from "pinia";
import type { IWareHouse } from "@/utils/types/store/WareHouseTypes";

interface IState {
  WareHouses: IWareHouse[];
  wareHouseDialogVisible: boolean;
}

export const useWarehouseStore = defineStore("WareHouseStore", {
  state: (): IState => ({
    WareHouses: [],
    wareHouseDialogVisible: false,
  }),
  actions: {
    async fetchWarehouses() {
      // $get<WareHouse>("/warehouse", { isBearer: true })
      //   .then((response) => {this.WareHouses = response;})
      //   .catch((errors) => {console.error(errors)});
    },
    addWareHouse(warehouse: IWareHouse) {
      warehouse.id = this.WareHouses.length + 1;
      this.WareHouses.push(warehouse);
      this.wareHouseDialogVisible = false;
      // $post<WareHouse>("/warehouse", { isBearer: true });
    },
    deleteWareHouse(id: number) {
      this.WareHouses = this.WareHouses.filter((wh) => wh.id !== id);
      // $delete<WareHouse>("/warehouse/" + wareHouseId, { isBearer: true });
    },
  },
});
