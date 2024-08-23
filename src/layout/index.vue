<template>
  <div class="header">
      <img src="/favicon.ico" alt="limu" class="logo">
      <div class="slogan">
        limu-paste 页面复制
      </div>
    </div>
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
.header {
  display: flex;
  align-items: center;
  height: 60px;
  .logo {
    margin-right: 20px;
    height: 40px;
  }
  .slogan {
    font-size: 16px;
    font-weight: bold
  }
}
.app-wrapper {
  display: flex;
  position: relative;
  height: calc(100% - 60px);
  width: 100%;
  background: #f4f7fc;
  .sidebar-container {
    box-shadow: 5px 9px 6px 0 rgb(0 21 41 / 12%);
    width: 300px;
    height: 100%;
  }
}


</style>
