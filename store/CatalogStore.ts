import { defineStore } from "pinia";
import type { ICatalog } from "@/utils/types/store/CatalogTypes";

interface IState {
  Catalogs: ICatalog[];
  catalogAddDialogVisible: boolean;
  catalogImportDialogVisible: boolean;
}

export const useCatalogStore = defineStore("CatalogStore", {
  state: (): IState => ({
    Catalogs: [],
    catalogAddDialogVisible: false,
    catalogImportDialogVisible: false,
  }),
  actions: {
    addCatalog(catalogs: ICatalog[]) {
      this.Catalogs.push(catalogs);
    },
  },
});
