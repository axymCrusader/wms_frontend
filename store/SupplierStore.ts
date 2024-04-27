import { defineStore } from "pinia";
import type { ISupplier } from "@/utils/types/store/SupplierTypes";

interface IState {
  Suppliers: ISupplier[];
  supplierDialogVisible: boolean;
}

export const useSupplierStore = defineStore("SupplierStore", {
  state: (): IState => ({
    Suppliers: [],
    supplierDialogVisible: false,
  }),
  actions: {
    async fetchSuppliers() {
      // $get<Supplier>("/supplier", { isBearer: true })
      //   .then((response) => {this.Suppliers = response;})
      //   .catch((errors) => {console.error(errors)});
    },
    addSupplier(supplier: ISupplier) {
      supplier.id = this.Suppliers.length + 1;
      this.Suppliers.push(supplier);
      this.supplierDialogVisible = false;
      // $post<Supplier>("/supplier", { isBearer: true });
    },
    async deleteSupplier(id: number) {
      this.Suppliers = this.Suppliers.filter((sp) => sp.id !== id);
      // $delete<Supplier>("/supplier/" + supplierId, { isBearer: true });
    },
  },
});
