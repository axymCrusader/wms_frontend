<script setup lang="ts">
const { info, groups } = $userLMA();
const { isAuth, logout } = $useAuthorization();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
