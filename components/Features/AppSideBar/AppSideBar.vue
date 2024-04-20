<script setup lang="ts">
import { MENU_DATA } from "./MenuData";
const { isAuth, logout } = $useAuthorization()
</script>

<style scoped></style>

<template>
  <q-drawer show-if-above bordered>
    <q-list>
      <NuxtLink v-for="item in MENU_DATA" :key="item.name" :to="item.url">
        <q-item clickable v-ripple>
          <q-item-section>{{ item.name }}</q-item-section>
        </q-item>
      </NuxtLink>
    </q-list>
  </q-drawer>
</template>
