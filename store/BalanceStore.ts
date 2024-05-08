import { defineStore } from "pinia";
import type { IBalance } from "@/utils/types/store/BalanceTypes";

interface IState {
  Balances: IBalance[];
  balanceAddDialogVisible: boolean;
  balanceDeleteDialogVisible: boolean;
}

export const useBalanceStore = defineStore("BalanceStore", {
  state: (): IState => ({
    Balances: [],
    balanceAddDialogVisible: false,
    balanceDeleteDialogVisible: false,
  }),
  actions: {
    addBalance(balances: IBalance[]) {
      balances.forEach((balance) => {
        this.Balances.push(balance);
      });
      this.balanceAddDialogVisible = false;
    },
  },
});
