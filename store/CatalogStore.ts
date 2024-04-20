import { defineStore } from "pinia";
import type {
  Catalog,
  Equipment,
  Property,
} from "@/utils/types/store/CatalogTypes";

export const useCatalogStore = defineStore("CatalogStore", {
  state: () => ({
    Catalogs: [] as Catalog[],
    Equipments: [] as Equipment[],
    Properties: [] as Property[],

    catalogDialogVisible: false,
  }),
  actions: {
    async fetchCatalogs() {
      $get<Catalog>("/catalog", {
        isBearer: true,
      })
        .then((res) => {})
        .catch((error) => {});
    },
    addCatalog(
      catalogs: Catalog[],
      equipments: Equipment[],
      properties: Property[]
    ) {
      this.Catalogs.push(...catalogs);
      this.Equipments.push(...equipments);
      this.Properties.push(...properties);
    },
  },
});
