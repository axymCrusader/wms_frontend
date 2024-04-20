import { defineStore } from "pinia";
import axios from "axios";
import type { Supplier } from "@/utils/types/store/SupplierTypes";

export const useSupplierStore = defineStore("SupplierStore",{
  state: () => ({
    Suppliers: [] as Supplier[],
    supplierDialogVisible: false,
  }),
  actions: {
    async fetchSuppliers() {
      // $get<Supplier>("/supplier", { isBearer: true })
      //   .then((response) => {this.Suppliers = response;})
      //   .catch((errors) => {console.error(errors)});
    },
    async addSupplier(supplier: Supplier) {
      this.Suppliers.push(supplier);
      this.supplierDialogVisible = false;
      // $post<Supplier>("/supplier", { isBearer: true });
    },
    async deleteSupplier(supplierId: string) {
      this.Suppliers = this.Suppliers.filter(sp => sp.supplierId !== supplierId);
      // $delete<Supplier>("/supplier/" + supplierId, { isBearer: true });
    }, 
  },
});
