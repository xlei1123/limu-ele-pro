<template>
  <div>
    <header class="logo">
      <img alt="logoIcon" class="logoIcon" src="/favicon.ico" />
      <p class="slogan">LIMU - 页面复制开发</p>
    </header>
    <div>
      <a href="https://marketplace.visualstudio.com/items?itemName=leixiang.limu-paste&ssr=false#review-details">limu-paste - vscode插件下载</a>
    </div>
  </div>
</template>
<script lang="ts">
export default { name: 'Dashboard' };
</script>

<script setup lang="ts">
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
