import { defineStore } from "pinia";
import type { Catalog } from "@/utils/types/store/CatalogTypes";

export const useCatalogStore = defineStore({
  id: "Catalog",
  state: () => ({
    Catalogs: [] as Catalog[],
  }),
  actions: {
    async fetchCatalogs() {
      $get<Catalog>("/catalog", {
        isBearer: true,
      })
        .then((res) => {})
        .catch((error) => {});
    },
  },
});
