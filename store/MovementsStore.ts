import { defineStore } from "pinia";
import type { IMovement } from "@/utils/types/store/MovementsTypes";

interface IState {
  Movements: IMovement[];
}

export const useMovementStore = defineStore("MovementStore", {
  state: (): IState => ({
    Movements: [],
  }),
  actions: {
    addMovment(movements: IMovement[]) {
      movements.forEach((movement) => {
        this.Movements.push(movement);
      });
    },
  },
});
