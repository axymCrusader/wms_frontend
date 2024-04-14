import { defineStore } from "pinia";
import axios from "axios";
import type { Supplier } from "@/utils/types/store/SupplierTypes";

export const useSupplierStore = defineStore({
  id: "Supplier",
  state: () => ({
    Suppliers: [] as Supplier[],
  }),
  actions: {
    async fetchSuppliers() {
      await axios
        .get("/api/app/supplier/")
        .then((response) => (this.Suppliers = response.data));
    },
  },
});
