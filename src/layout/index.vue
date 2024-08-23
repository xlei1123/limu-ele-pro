<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <app-main />
  </div>
</template>

<script setup lang="ts">
import { AppMain } from './components/index';
import Sidebar from './components/Sidebar/index.vue';

</script>

<style lang="scss" scoped>

.app-wrapper {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  background: #f4f7fc;
}

.sidebar-container {
  box-shadow: 5px 9px 6px 0 rgb(0 21 41 / 12%);
  width: 300px;
  height: 100vh;
}
</style>
