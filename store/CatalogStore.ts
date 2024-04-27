import { defineStore } from "pinia";
import type { ICatalog } from "@/utils/types/store/CatalogTypes";

interface IState {
  Catalogs: ICatalog[];
  catalogAddDialogVisible: boolean;
}

export const useCatalogStore = defineStore("CatalogStore", {
  state: (): IState => ({
    Catalogs: [],
    catalogAddDialogVisible: false,
  }),
  actions: {
    addCatalog(catalogs: ICatalog[]) {
      this.Catalogs.push(...catalogs);
    },
  },
});
