<script setup>
import WelcomeItem from './WelcomeItem.vue';
import DocumentationIcon from './icons/IconDocumentation.vue';
import ToolingIcon from './icons/IconTooling.vue';
import EcosystemIcon from './icons/IconEcosystem.vue';
import CommunityIcon from './icons/IconCommunity.vue';
import SupportIcon from './icons/IconSupport.vue';
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>介绍</template>
    一直以来，前端没有一个集成的应用程序方便的管理host、node版本以及镜像源，
    在项目开发时，常常需要更改hosts文件、node版本和镜像源，另外，项目代码、需求文档以及ui文档都散落在各处，时间一长，难以查找。此应用程序解决上述问题而生，你可以可视化的管理hosts、node版本、镜像源、项目管理
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>项目管理</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>hosts管理</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>node版本管理</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>镜像源</template>
  </WelcomeItem>
</template>

<style scoped>
a {
  color: rgb(79, 192, 141);
}
</style>
