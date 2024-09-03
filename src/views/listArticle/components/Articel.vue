<!-- eslint-disable max-len -->
<template>
  <section class="article">
    <div class="left">
      <h4 class="title ellipsis">{{ article.title }}</h4>
      <p class="summary ellipsis">{{ article.summary }}</p>
      <div class="info">
        <div>
          <span class="author"> {{ article.author }}</span>
          <span class="readCount"
            ><el-icon><View /></el-icon> {{ article.readCount }}</span
          >
          <span class="goodCount"
            ><el-icon><StarFilled /></el-icon> {{ article.goodCount }}</span
          >
        </div>
        <div>
          <span class="label" v-for="label in article.labels" :key="label">{{ label }}</span>
        </div>
      </div>
    </div>
    <img
      src="https://p26-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/3b6e7773fbd546ae9c9f41a19bfa86b7~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg55-z5bCP55-zT3J6:q75.awebp?rk3s=f64ab15b&x-expires=1725929210&x-signature=ocPViDVNkEnTKkPAXKKj0zTk1BM%3D"
    />
  </section>
</template>

<script lang="ts" setup>
defineProps({
  article: {
    required: true,
    type: {} as any, // 业务自己的字段 自己定义
    default: 0
  }
});
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgb(242, 243, 245);
  cursor: pointer;
  .left {
    width: calc(100% - 132px);
  }
  .title {
    margin: 4px 0;
    width: 100%;
    font-weight: bold;
  }
  .summary {
    margin: 10px 0;
    font-size: 13px;
    color: rgb(138, 145, 159);
  }
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(138, 145, 159);
    font-size: 13px;
    .author,
    .readCount {
      margin-right: 10px;
    }
    .label {
      margin-left: 10px;
      padding: 4px 6px;
      background-color: rgb(242, 243, 245);
    }
  }
  img {
    width: 108px;
    height: 72px;
    margin-left: 24px;
    background-color: var(--juejin-layer-1);
    border-radius: 4px;
  }
}
</style>
