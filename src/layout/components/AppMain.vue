<template>
  <section class="app-main">
    <div class="currentRouteTitle">
      {{ route.meta.title }} <el-button type="primary" @click="copyFullPath">复制该页面</el-button><el-button class="back-btn" v-if="route.meta.hidden" text @click="goBack"> 返回</el-button>
    </div>
    <router-view />
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import copy from 'copy-to-clipboard';

const route = useRoute();

const goBack = () => {
  window.history.go(-1);
};
const copyFullPath = () => {
  const copyStr = {
    path: route.fullPath,
    dependencies: route.meta.dependencies
  };
  copy(JSON.stringify(copyStr));
}
</script>

<style lang="scss" scoped>

.app-main {
  max-height: calc(100vh);
  width: 100%;
  position: relative;
  overflow-y: auto;
  margin: 0 10px;
  padding: 10px 20px 20px 10px;
  background-color: #F7F8FA;
}


.back-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
}

.currentRouteTitle {
  height: 28px;
  margin: 8px 0;
  font-size: 20px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #242f57;
  line-height: 28px;
}

#copy {
  visibility: hidden;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
