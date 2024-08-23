<template>
  <div>
    <header class="logo">
      <img alt="logoIcon" class="logoIcon" src="/favicon.ico" />
      <p class="slogan">LIMU - 页面复制开发</p>
    </header>
    <main>
      
    </main>
  </div>
</template>
<script lang="ts">
export default { name: 'Dashboard' };
</script>

<script setup lang="ts">
import TheWelcome from './components/TheWelcome.vue';
</script>

<style lang="scss" scoped>
.logo {
  margin-top: 20px;
}
.logoIcon {
  display: block;
  width: 60px;
  margin: 0 auto;
}
.slogan {
  text-align: center;
  color: #36ab60;
}
</style>
