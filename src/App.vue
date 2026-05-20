<script setup lang="ts">
import './assets/main.css'
</script>

<template>
  <!-- nav bar -->
  <nav class="bg-pink-100 px-4 py-6 flex justify-between">
    <h1 class="text-red-400">Todo App</h1>
    <p>Itemearau</p>
  </nav>

  <main>
    <RouterView/>
  </main>
</template>

<style scoped>
</style>
