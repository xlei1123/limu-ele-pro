<template>
  <div>当前页面</div>
  <div>
    {{ breadcrumbs[breadcrumbs.length - 1].meta.title }}
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router';

const currentRoute = useRoute();


const breadcrumbs = ref([] as Array<RouteLocationMatched>);

function getBreadcrumb() {
  let matched = currentRoute.matched.filter((item) => item.meta && item.meta.title);
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
}


watch(
  () => currentRoute.path,
  (path) => {
    if (path.startsWith('/redirect/')) {
      return;
    }
    getBreadcrumb();
  }
);

onBeforeMount(() => {
  getBreadcrumb();
});
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 20px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
