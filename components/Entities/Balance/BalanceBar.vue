<script setup lang="ts">
import { useBalanceStore } from "@/store/BalanceStore";
const balanceStore = useBalanceStore();
</script>

<template>
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Оприходовать"
    @click="balanceStore.balanceAddDialogVisible = true"
  />
  <q-btn
    color="white"
    class="q-ml-sm"
    text-color="black"
    label="Списать"
    @click="balanceStore.balanceDeleteDialogVisible = true"
  />
</template>
