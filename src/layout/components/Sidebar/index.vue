<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        background-color="#fff"
        text-color="#999"
        active-color="#409efe"
        :router="true"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-menu-item
          v-for="routeItem in routeConfig"
          :index="'/' + routeItem.path"
          :key="routeItem.path"
        >
          <span>{{ routeItem.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import routeConfig from '@/config/constants/routeConfig';

const route = useRoute();
const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});
</script>
<style lang="scss" scoped>
:deep(.scrollbar-wrapper) {
  background-color: #fff;
}
</style>
