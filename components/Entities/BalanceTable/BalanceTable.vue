<script setup lang="ts">
import { balanceColumns } from "./BalanceTableColums";
const balances = [
  {
    balanceId: "--",
    equipmentName: "--",
    wareHouseName: "--",
    equipmentQuantity: "--",
  },
];
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Остатки"
      :rows="balances"
      :columns="balanceColumns"
      row-key="name"
      flat
      sep-rows
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.name }}.
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
