<script setup lang="ts"></script>
const { logout } = $useAuthorization()
<style scoped></style>

<template>
  <q-header elevated class="bg-green">
    <q-toolbar>
      <q-toolbar-title> EM4R </q-toolbar-title>
      <q-btn flat round dense icon="logout" />
    </q-toolbar>
  </q-header>
</template>
