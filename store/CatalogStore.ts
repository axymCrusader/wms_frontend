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
    async addCatalog(
      catalogs: Catalog[],
      equipments: Equipment[],
      properties: Property[]
    ) {
      this.Catalogs.push(...catalogs);
      this.Equipments.push(...equipments);
      this.Properties.push(...properties);
    },
    getEquipmentNamesByCatalogId(catalogId: string) {
      const catalogs = this.Catalogs.filter(
        (catalog: Catalog) => catalog.catalogId === catalogId
      );
      const equipments = this.Equipments.filter((equipment: Equipment) =>
        catalogs.some(
          (catalog: Catalog) =>
            catalog.catalogEquipmentId === equipment.equipmentId
        )
      );
      return equipments.map((equipment) => ({
        label: equipment.equipmentName,
        value: equipment.equipmentId,
      }));
    },
  },
});
